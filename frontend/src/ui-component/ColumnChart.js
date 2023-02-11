import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';

// ==============================|| DEFAULT DASHBOARD ||============================== //

import { useLayoutEffect } from 'react';
import { CHART_PARAMETERS_ENUM } from '../constants/Constants';
import { useDispatch } from 'react-redux';
import am5locales_ru_RU from '@amcharts/amcharts5/locales/ru_RU';

const ColumnChart = ({ titleChart, chartRootName, data, intervalTimeUnit, intervalCount, comments = false }) => {
    const dispatch = useDispatch();

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

        // Create series
        function createSeries(name, field) {
            let series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
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

            if (comments) {
                series.columns.template.events.on('click', (ev) => {
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
                });
            }

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
                am5xy.ColumnSeries.new(root, {
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
    }, [data]);

    return <div id={chartRootName} style={{ width: '100%', height: '500px' }}></div>;
};

export default ColumnChart;
