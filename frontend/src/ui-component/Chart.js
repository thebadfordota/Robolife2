// material-ui

// project imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

// ==============================|| DEFAULT DASHBOARD ||============================== //

import { useLayoutEffect } from 'react';
import { CHART_PARAMETERS_ENUM } from '../constants/Constants';

const Chart = ({ chartRootName, data, intervalTimeUnit, intervalCount }) => {
    useLayoutEffect(() => {
        let root = am5.Root.new(chartRootName);

        root.setThemes([am5themes_Animated.new(root)]);

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
        xAxis.data.setAll(data);

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

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Circle.new(root, {
                        radius: 6,
                        stroke: root.interfaceColors.get('background'),
                        strokeWidth: 0,
                        fill: series.get('fill')
                    })
                });
            });

            series.data.setAll(data);
        }
        if (data.length) {
            Object.keys(data[0]).forEach((key) => {
                if (key !== 'date') createSeries(CHART_PARAMETERS_ENUM[key], key);
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

        let scrollbarX = am5xy.XYChartScrollbar.new(root, {
            orientation: 'horizontal',
            height: 50
        });

        chart.set('scrollbarX', scrollbarX);

        let sbxAxis = scrollbarX.chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: 'hour', count: 1 },
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
                valueYField: 'value',
                valueXField: 'date'
            })
        );

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

        sbseries.data.setAll(data);

        return () => {
            root.dispose();
        };
    }, [data]);

    return <div id={chartRootName} style={{ width: '100%', height: '500px' }}></div>;
};

export default Chart;
