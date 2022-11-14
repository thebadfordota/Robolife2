// material-ui

// project imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

// ==============================|| DEFAULT DASHBOARD ||============================== //

import { useLayoutEffect } from 'react';

const Chart = () => {
    useLayoutEffect(() => {
        let root = am5.Root.new('chartdiv');

        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                layout: root.verticalLayout
            })
        );

        // Define data

        let data = [
            {
                date: new Date(2012, 1, 1).getTime(),
                value: 8
            },
            {
                date: new Date(2012, 1, 2).getTime(),
                value: 5
            },
            {
                date: new Date(2012, 1, 3).getTime(),
                value: 12
            },
            {
                date: new Date(2012, 1, 4).getTime(),
                value: 14
            },
            {
                date: new Date(2012, 1, 5).getTime(),
                value: 11
            },
            {
                date: new Date(2012, 1, 6).getTime(),
                value: 11
            },
            {
                date: new Date(2012, 1, 7).getTime(),
                value: 11
            },
            {
                date: new Date(2012, 1, 8).getTime(),
                value: 11
            },
            {
                date: new Date(2012, 1, 9).getTime(),
                value: 11
            },
            {
                date: new Date(2012, 1, 15).getTime(),
                value: 13
            }
        ];

        let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                maxDeviation: 0.1,
                groupData: false,
                baseInterval: {
                    timeUnit: 'day',
                    count: 1
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
        let series = chart.series.push(
            am5xy.LineSeries.new(root, {
                minBulletDistance: 10,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'value',
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

        // Add legend
        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set(
            'cursor',
            am5xy.XYCursor.new(root, {
                xAxis: xAxis
            })
        );
        cursor.lineY.set('visible', false);

        var scrollbarX = am5xy.XYChartScrollbar.new(root, {
            orientation: 'horizontal',
            height: 50
        });

        chart.set('scrollbarX', scrollbarX);

        var sbxAxis = scrollbarX.chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                groupData: true,
                groupIntervals: [{ timeUnit: 'year', count: 1 }],
                baseInterval: { timeUnit: 'day', count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {
                    opposite: false,
                    strokeOpacity: 0
                })
            })
        );

        var sbyAxis = scrollbarX.chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        var sbseries = scrollbarX.chart.series.push(
            am5xy.LineSeries.new(root, {
                xAxis: sbxAxis,
                yAxis: sbyAxis,
                valueYField: 'value',
                valueXField: 'date'
            })
        );
        sbseries.data.setAll(data);

        return () => {
            root.dispose();
        };
    }, []);

    return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>;
};

export default Chart;
