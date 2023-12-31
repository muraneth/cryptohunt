"use client";

import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-wordcloud";
import { topTag } from "@/app/[locale]/dashboard/data/schema";

export default function HashTagWordCloud({
  data,
  daysOffset = "1",
}: {
  data: topTag[];
  daysOffset: string;
}) {
  const option = {
    series: [
      {
        type: "wordCloud",

        // The shape of the "cloud" to draw. Can be any polar equation represented as a
        // callback function, or a keyword present. Available presents are circle (default),
        // cardioid (apple or heart shape curve, the most known polar equation), diamond (
        // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

        shape: "diamond",

        // Keep aspect ratio of maskImage or 1:1 for shapes
        // This option is supported since echarts-wordcloud@2.1.0
        keepAspect: false,

        // A silhouette image which the white area will be excluded from drawing texts.
        // The shape option will continue to apply as the shape of the cloud to grow.

        // maskImage: maskImage,

        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
        // Default to be put in the center and has 75% x 80% size.

        left: "center",
        top: "center",
        width: "90%",
        height: "85%",
        right: null,
        bottom: null,

        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.

        sizeRange: [12, 60],

        // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

        // rotationRange: [-90, 90],
        // rotationStep: 45,
        rotationRange: [0, 0],
        rotationStep: 45,

        // size of the grid in pixels for marking the availability of the canvas
        // the larger the grid size, the bigger the gap between words.

        gridSize: 16,

        // set to true to allow word to be drawn partly outside of the canvas.
        // Allow word bigger than the size of the canvas to be drawn
        // This option is supported since echarts-wordcloud@2.1.0
        drawOutOfBound: false,

        // if the font size is too large for the text to be displayed,
        // whether to shrink the text. If it is set to false, the text will
        // not be rendered. If it is set to true, the text will be shrinked.
        // This option is supported since echarts-wordcloud@2.1.0
        shrinkToFit: false,

        // If perform layout animation.
        // NOTE disable it will lead to UI blocking when there is lots of words.
        layoutAnimation: true,

        // Global text style
        textStyle: {
          fontFamily: "sans-serif",
          fontWeight: "bold",
          // Color can be a callback function or a color string
          color: function () {
            // Random color
            return (
              "rgb(" +
              [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
              ].join(",") +
              ")"
            );
          },
        },
        emphasis: {
          focus: "self",

          textStyle: {
            textShadowBlur: 10,
            textShadowColor: "#333",
          },
        },

        // Data is an array. Each array item must have name and value property.
        data: data.map((_: any) => {
          return {
            name: _.tag,
            value: _[`score${daysOffset}d`],
          };
        }),
      },
    ],
  };

  return (
    // <div style={{ marginTop: "50px", width: "82%" }}>
    //   <ReactECharts
    //     //   style={{ width: "56%" }}
    //     option={option}
    //     theme="ThemeStyle"
    //   />
    // </div>
    <ReactECharts
      style={{ width: "100%" }}
      // className="w-full h-full"
      option={option}
      theme="ThemeStyle"
    />
  );
}
