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
                <el-table :data="menuList" stripe border size="small" style="width: 100%">
                    <el-table-column prop="menuName" label="菜单名" width="180">
                    </el-table-column>
                    <el-table-column prop="url" label="地址" width="180">
                    </el-table-column>
                    <el-table-column prop="permit" label="权限" width="150">
                    </el-table-column>
                    <el-table-column prop="visible" label="可见" width="150">
                    </el-table-column>
                    <el-table-column prop="columnComment" label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="codeCreate(scope.row)">生成代码</el-button>
                            <el-button size="mini" type="success" @click="showColumns(scope.row)">字段明细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="字段明细" :visible.sync="dialogTableVisible">
                    <el-table :data="columnData" stripe border size="small" >
                        <el-table-column property="ordinalPosition" label="序列" width="50"></el-table-column>
                        <el-table-column property="columnName" label="字段名" width="150"></el-table-column>
                        <el-table-column property="columnType" label="类型" width="100"></el-table-column>
                        <el-table-column property="columnComment" label="备注" width="150"></el-table-column>columnDefault
                        <el-table-column property="columnDefault" label="默认值" width="150"></el-table-column>
                    </el-table>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            menuList: [],
            columnData: [],
            searchModel: {},
            dialogTableVisible: false
        };
    },
    created: function() {
        var that = this;
        that.getMenuList();
    },
    methods: {
        getMenuList() {
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/system/getMenuList")
                .then(function(response) {
                    that.menuList = response.data.result;
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        codeCreate(row) {
            window.location.href =
                this.$baseUrl + "/setting/codeCreate?table=" + row.tableName;
        },
        showColumns(row) {
            var that = this;
            this.$ajax
                .get(
                    this.$baseUrl +
                        "/setting/getColumnsList?table=" +
                        row.tableName
                )
                .then(function(response) {
                    that.dialogTableVisible = true;
                    that.columnData = response.data.result;
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        }
    }
};
</script>