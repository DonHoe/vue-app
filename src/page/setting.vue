<template>
    <el-container style="height: 100%;">
        <el-header height="">
            <el-form :inline="true" :model="searchModel" size="mini" label-width="100px">
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="表名">
                            <el-input v-model="searchModel.callerClass" class="input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="备注">
                            <el-input v-model="searchModel.callerClass" class="input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="">
                            <el-button>查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-header>
        <el-container>
            <el-main>
                <el-table :data="tableList" stripe border size="small" style="width: 100%">
                    <el-table-column prop="tableName" label="表名" width="180">
                    </el-table-column>
                    <el-table-column prop="tableComment" label="备注" width="180">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="150">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" width="150">
                    </el-table-column>
                    <el-table-column prop="columnComment" label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="codeCreate(scope.row)">生成代码</el-button>
                            <el-button size="mini" type="success" >字段明细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            tableList: [],
            columnData: [],
            searchModel: {}
        };
    },
    created: function() {
        var that = this;
        that.getTableList();
    },
    methods: {
        getTableList() {
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/setting/getTableList")
                .then(function(response) {
                    that.tableList = response.data.result;
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        codeCreate(row) {
            window.location.href = this.$baseUrl +
                        "/setting/codeCreate?table=" +row.tableName;
            // this.$ajax
            //     .get(
            //         this.$baseUrl +
            //             "/setting/codeCreate?table=" +row.tableName
            //     )
            //     .then(function() {
            //     })
            //     .catch(function(err) {
            //         window.console.log(err);
            //     });
        },
        handleNodeClick(data) {
            var that = this;
            this.$ajax
                .get(
                    this.$baseUrl +
                        "/setting/getColumnsList?table=" +
                        data.label
                )
                .then(function(response) {
                    that.columnData = response.data.result;
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        }
    }
};
</script>