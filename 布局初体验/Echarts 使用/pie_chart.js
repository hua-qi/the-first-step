var chartDom = document.getElementById("pie_chart");
var myChart = echarts.init(chartDom);
var option;

option = {
  title: {
    text: "学生整体学习情况",
    left: "right",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "学生整体学习情况",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "态度" },
        { value: 735, name: "组织" },
        { value: 580, name: "清晰度" },
        { value: 484, name: "内容" },
        { value: 300, name: "知识面" },
        { value: 300, name: "作业" },
        { value: 300, name: "效果" },
        { value: 300, name: "价值" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

option && myChart.setOption(option);
