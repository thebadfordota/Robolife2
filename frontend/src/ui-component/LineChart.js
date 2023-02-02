import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';

// ==============================|| DEFAULT DASHBOARD ||============================== //

import { useEffect, useLayoutEffect, useState } from 'react';
import { CHART_PARAMETERS_ENUM } from '../constants/Constants';
import { useDispatch } from 'react-redux';
import am5locales_ru_RU from '@amcharts/amcharts5/locales/ru_RU';
import { rgba2hex } from '@amcharts/amcharts5/.internal/core/util/Color';

const LineChart = ({ titleChart, chartRootName, data, intervalTimeUnit, intervalCount, comments = false, range = false }) => {
    const dispatch = useDispatch();
    const [cornNormalPrec, setCornNormalPrec] = useState(true);

    useLayoutEffect(() => {
        let root = am5.Root.new(chartRootName);
        root.locale = am5locales_ru_RU;
        if (root._logo) {
            root._logo.dispose();
        }

        root.setThemes([am5themes_Animated.new(root)]);
        root.numberFormatter.set('intlLocales', 'ru-RU');

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                wheelY: 'zoomX',
                layout: root.verticalLayout
            })
        );

        let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                maxDeviation: 0.1,
                groupData: true,
                baseInterval: {
                    timeUnit: intervalTimeUnit,
                    count: intervalCount
                },
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 50
                }),
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.1,
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        yAxis.children.unshift(
            am5.Label.new(root, {
                rotation: -90,
                text: titleChart,
                y: am5.p50,
                centerX: am5.p50
            })
        );

        xAxis.data.setAll(data);

        let scrollbarX = am5xy.XYChartScrollbar.new(root, {
            orientation: 'horizontal',
            height: 50
        });

        chart.set('scrollbarX', scrollbarX);

        // Create axis ranges
        function createRange(startValue, endValue, color) {
            var rangeDataItem = yAxis.makeDataItem({
                value: startValue,
                endValue: endValue
            });

            var range = yAxis.createAxisRange(rangeDataItem);

            range.get('axisFill').setAll({
                fill: color,
                fillOpacity: 0.2,
                visible: true
            });

            range.get('label').setAll({
                fill: am5.color(0xffffff),
                text: startValue + '-' + endValue,
                location: 1,
                background: am5.RoundedRectangle.new(root, {
                    fill: color
                })
            });
        }

        if (range) {
            // Add custom button
            var button = chart.plotContainer.children.push(
                am5.Button.new(root, {
                    dx: 10,
                    dy: 10,
                    layer: 40,
                    icon: am5.Graphics.new(root, {
                        fill: am5.color(0xffffff),
                        svgPath:
                            'M11,5 L9,5 L9,9 L5,9 L5,11 L9,11 L9,15 L11,15 L11,11 L15,11 L15,9 L11,9 L11,5 L11,5 Z M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C14.4,2 18,5.6 18,10 C18,14.4 14.4,18 10,18 L10,18 Z'
                    })
                })
            );

            button.events.on('click', function (ev) {
                setCornNormalPrec(!cornNormalPrec);
            });

            if (cornNormalPrec) {
                createRange(range.min, range.max, am5.color(0xa8e4a0));
            } else {
                yAxis.axisRanges.removeValue(range.min, range.max);
            }
        }

        // Create series
        function createSeries(name, field) {
            let series = chart.series.push(
                am5xy.LineSeries.new(root, {
                    minBulletDistance: 10,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    name: name,
                    valueYField: field,
                    valueXField: 'date',
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: 'horizontal',
                        labelText: '{valueX.formatDate()}: {valueY}'
                    })
                })
            );

            series.strokes.template.setAll({
                strokeWidth: 3,
                templateField: 'strokeSettings'
            });

            let bulletTemplate = am5.Template.new(root, {});

            if (comments) {
                bulletTemplate.events.on('click', function (ev) {
                    if (!field.includes('Normal')) {
                        const ModalWindowData = {
                            status: true,
                            date: ev.target.dataItem.dataContext.date,
                            value: ev.target.dataItem.dataContext[field],
                            id: ev.target.dataItem.dataContext.id,
                            typeParam: name
                        };
                        if (ev.target.dataItem.dataContext.date) {
                            dispatch({
                                type: 'SET_STATE_MODAL',
                                ...ModalWindowData
                            });
                        }
                    }
                });
            }

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Circle.new(
                        root,
                        {
                            radius: 6,
                            stroke: root.interfaceColors.get('background'),
                            strokeWidth: 0,
                            fill: series.get('fill')
                        },
                        bulletTemplate
                    )
                });
            });

            series.data.setAll(data);

            let sbxAxis = scrollbarX.chart.xAxes.push(
                am5xy.DateAxis.new(root, {
                    baseInterval: { timeUnit: intervalTimeUnit, count: intervalCount },
                    renderer: am5xy.AxisRendererX.new(root, {
                        opposite: false,
                        strokeOpacity: 0
                    })
                })
            );

            let sbyAxis = scrollbarX.chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {})
                })
            );

            let sbseries = scrollbarX.chart.series.push(
                am5xy.LineSeries.new(root, {
                    xAxis: sbxAxis,
                    yAxis: sbyAxis,
                    valueYField: field,
                    valueXField: 'date'
                })
            );

            sbseries.data.setAll(data);
        }

        if (data.length) {
            Object.keys(data[0]).forEach((key) => {
                if (key !== 'date' && key !== 'id') createSeries(CHART_PARAMETERS_ENUM[key], key);
            });
        }

        // Add legend
        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set(
            'cursor',
            am5xy.XYCursor.new(root, {
                xAxis: xAxis
            })
        );

        cursor.lineY.set('visible', false);

        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );
        legend.itemContainers.template.states.create('hover', {});

        legend.itemContainers.template.events.on('pointerover', function (e) {
            e.target.dataItem.dataContext.hover();
        });
        legend.itemContainers.template.events.on('pointerout', function (e) {
            e.target.dataItem.dataContext.unhover();
        });
        legend.data.setAll(chart.series.values);

        let exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            dataSource: data
        });

        return () => {
            root.dispose();
        };
    }, [data, cornNormalPrec]);

    return <div id={chartRootName} style={{ width: '100%', height: '500px' }}></div>;
};

export default LineChart;
