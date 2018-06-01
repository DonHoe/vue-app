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
                    <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
                    我的行程
                </el-tab-pane>
                <el-tab-pane label="消息中心">消息中心</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";

export default {};
</script>