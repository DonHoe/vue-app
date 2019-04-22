<template>
    <el-container style="height: 100%;">
        <el-aside width="200px">
            <el-tree :data="tableList" :default-expand-all="true" @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <el-container>
            <el-main>
                <el-table :data="columnData" stripe size="small" style="width: 100%">
                    <el-table-column prop="ordinalPosition" label="顺序" width="50">
                    </el-table-column>
                    <el-table-column prop="columnName" label="列名" width="180">
                    </el-table-column>
                    <el-table-column prop="columnType" label="类型" width="150">
                    </el-table-column>
                    <el-table-column prop="isNullable" label="非空" width="100">
                    </el-table-column>
                    <el-table-column prop="columnComment" label="备注" width="250">
                    </el-table-column>
                    <el-table-column prop="columnDefault" label="默认值" width="200">
                    </el-table-column>
                    <el-table-column prop="columnKey" label="键" width="100">
                    </el-table-column>
                    <el-table-column prop="extra" label="扩展" width="200">
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
            tableList: [
                {
                    label: "data",
                    children: []
                }
            ],
            columnData: []
        };
    },
    created: function() {
        var that = this;
        that.initTableList();
    },
    methods: {
        initTableList() {
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/setting/getTableList")
                .then(function(response) {
                    for (var i = 0; i < response.data.result.length; i++) {
                        that.tableList.children.push({
                            label: response.data.result[i]
                        });
                    }
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        handleNodeClick(data) {
            var that = this;
            this.$ajax
                .get(
                    this.$baseUrl +
                        "/setting/getColumnsList?tableName=" +
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