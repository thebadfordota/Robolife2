import React, { useLayoutEffect } from 'react';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5radar from '@amcharts/amcharts5/radar';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5 from '@amcharts/amcharts5';

const WindRose = ({ chartRootName, data }) => {
    useLayoutEffect(() => {
        let root = am5.Root.new(chartRootName);
        if (root._logo) {
            root._logo.dispose();
        }

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/radar-chart/
        let chart = root.container.children.push(
            am5radar.RadarChart.new(root, {
                panX: false,
                panY: false,
                wheelX: 'panX'
            })
        );

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
        let cursor = chart.set('cursor', am5radar.RadarCursor.new(root, {}));

        cursor.lineY.set('visible', false);

        // Create axes and their renderers
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
        let xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.1,
                groupData: false,
                min: 1,
                max: 360,
                strictMinMax: true,
                renderer: am5radar.AxisRendererCircular.new(root, {
                    minGridDistance: 50
                }),
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5radar.AxisRendererRadial.new(root, {})
            })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
        function createSeries(name, field) {
            let series = chart.series.push(
                am5radar.RadarLineSeries.new(root, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: field,
                    valueXField: 'direction',
                    tooltip: am5.Tooltip.new(root, {
                        labelText: '{valueY} км/ч'
                    })
                })
            );

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        radius: 1,
                        fill: series.get('fill')
                    })
                });
            });
            series.fills.template.setAll({ visible: true });

            series.data.setAll(data);
            series.appear(1000);
        }

        if (data.length) createSeries('Максимальная скорость ветра', 'windSpeed');

        // Animate chart and series in
        // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, [data]);

    return <div id={chartRootName} style={{ width: '100%', height: '500px' }}></div>;
};

export default WindRose;
