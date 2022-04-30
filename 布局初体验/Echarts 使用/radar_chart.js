var chartDom = document.getElementById("radar_chart");
var myChart = echarts.init(chartDom);
var option;

option = {
  title: {
    text: "学生整体学习情况",
  },
  legend: {
    data: ["Allocated Budget", "Actual Spending"],
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: "态度", max: 6500 },
      { name: "组织", max: 16000 },
      { name: "清晰性", max: 30000 },
      { name: "内容", max: 38000 },
      { name: "知识面", max: 52000 },
      { name: "作业", max: 25000 },
      { name: "效果", max: 36000 },
      { name: "价值", max: 5000 },
    ],
  },
  series: [
    {
      name: "Budget vs spending",
      type: "radar",
      data: [
        {
          value: [4200, 13000, 20000, 35000, 50000, 18000, 19000, 3000],
          name: "学生整体学习情况",
        },
      ],
    },
  ],
};

option && myChart.setOption(option);
