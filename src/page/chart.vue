<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-top:15px;">
            <el-tabs type="border-card" style="min-height:450px;">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> 组别统计</span>
                    <div id="item1" :style="{width: '950px',height: '500px'}"></div>
                </el-tab-pane>
                <el-tab-pane label="区域统计">
                    <div id="item2" :style="{width: '950px',height: '500px'}"></div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return { list: [] };
  },
  created: function() {
    //this.drawChart();
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart: function() {
      var chart1 = echarts.init(document.getElementById("item1"));
      var chart2 = echarts.init(document.getElementById("item2"));
      var option1 = {
        title: {
          text: "各组任务完成量"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["一组", "二组", "三组", "四组", "五组"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "一组",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "二组",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "三组",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "四组",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "五组",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      var option2 = {
        title: {
          text: "区域",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: ["华北", "东北", "华东", "华南", "西南", "西北", "华中"],
          selected: "华东"
        },
        series: [
          {
            name: "区域",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: [{name:"华北",value:22}, {name:"东北",value:12}, {name:"华东",value:42}, {name:"华南",value:24}, {name:"西南",value:12}, {name:"西北",value:28}, {name:"华中",value:32}],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      chart1.setOption(option1);
      chart2.setOption(option2);
    }
  }
};
</script>