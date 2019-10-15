<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息</el-breadcrumb-item>
                <el-breadcrumb-item>问答</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-top: 20px;">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-input v-model="input_url" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button @click="startSpider">默认按钮</el-button>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top: 20px;">
            <el-row>
                <el-col :span="12">
                    <div id="item1" :style="{width: '950px',height: '500px'}"></div>
                </el-col>
                <el-col :span="12">
                    <div class=""></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class=""></div>
                </el-col>
                <el-col :span="12">
                    <div class=""></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
    data() {
        return {
            listTotal: 0,
            dialogFormVisible: false,
            dialogTableVisible: false,
            list: [],
            resultColumn: [],
            resultList: [],
            emptyDataItem: {
                name: "",
                desc: "",
                startUrl: "",
                userAgent: "",
                sleepTime: "",
                retryTimes: "",
                regexTargetUrls: [],
                extractFields: []
            },
            dataItem: {},
            input_url: "",
            statusEmun: { 0: "初始", 1: "执行", 2: "暂停" }
        };
    },
    created: function() {
        //var that = this;
        //that.search();
    },
    methods: {
        add: function() {
            var that = this;
            that.dataItem = JSON.parse(JSON.stringify(that.emptyDataItem));
            that.dialogFormVisible = true;
        },
        drawChart: function(rate) {
            var chart1 = echarts.init(
                document.getElementById("item1"),
                "light"
            );
            var option1 = {
                legend: {
                    bottom: 10,
                    left: "center",
                    data: ["1", "2", "3", "4", "5"]
                },
                series: [
                    {
                        type: "pie",
                        radius: "65%",
                        center: ["50%", "50%"],
                        selectedMode: "single",
                        data: rate,
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
        },
        search: function() {
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/home/getRatePercent")
                .then(function(response) {
                    var rateList = response.data.result;
                    var rate = [];
                    rateList.forEach(v => {
                        rate.push({
                            name: v.rate,
                            value: v.num
                        });
                    });
                    that.drawChart(rate);
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        startSpider:function(){
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/home/startSpider",{
                    params:{
                        url:that.input_url
                    }
                })
                .then(function(response) {
                    window.console.log(response.data);
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        }
    }
};
</script>
<style>
.line {
    text-align: center;
}
.form-row {
    margin-bottom: 10px;
}
</style>

