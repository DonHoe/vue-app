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
                            <el-button @click="getMenuList()">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-header>
        <el-container>
            <el-main>
                <el-table :data="menuList" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" stripe border size="small" style="width: 100%">
                    <el-table-column prop="menuName" label="菜单名" width="180">
                    </el-table-column>
                    <el-table-column prop="url" label="地址" width="180">
                    </el-table-column>
                    <el-table-column prop="permit" label="权限" width="150">
                    </el-table-column>
                    <el-table-column prop="menuType" label="类型" align="center" width="80">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.menuType == 0">菜单</el-tag>
                            <el-tag v-if="scope.row.menuType == 1" type="info">按钮</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="visible" label="显示" align="center" width="80">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.visible == 0" effect="dark" type="success">显示</el-tag>
                            <el-tag v-if="scope.row.visible == 1" effect="dark" type="info">隐藏</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="columnComment" label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" title="编辑" icon="el-icon-edit-outline" @click="editMenu(scope.row)"></el-button>
                            <el-button size="mini" title="新增" icon="el-icon-plus" @click="addMenu(scope.row)"></el-button>
                            <el-button size="mini" type="danger" title="删除" icon="el-icon-delete" @click="confirmDelete(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="菜单" :visible.sync="dialogTableVisible" width="30%">
                    <el-form ref="menuModel" :model="menuModel" label-width="80px" size="small">
                        <input type="hidden" v-model="menuModel.id" />
                        <input type="hidden" v-model="menuModel.parentId" />
                        <el-form-item label="菜单名称">
                            <el-input v-model="menuModel.menuName"></el-input>
                        </el-form-item>
                        <el-form-item label="路径">
                            <el-input v-model="menuModel.url"></el-input>
                        </el-form-item>
                        <el-form-item label="权限">
                            <el-input v-model="menuModel.permit"></el-input>
                        </el-form-item>
                        <el-form-item label="图标">
                            <el-input v-model="menuModel.icon"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-radio v-model="menuModel.menuType" :label=0>菜单</el-radio>
                            <el-radio v-model="menuModel.menuType" :label=1>按钮</el-radio>
                        </el-form-item>
                        <el-form-item label="显示">
                            <el-switch v-model="menuModel.visible" :active-value=0 :inactive-value=1>
                            </el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveMenu()">保存</el-button>
                        </el-form-item>
                    </el-form>
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
            menuModel: {},
            emptyMenu: {
                id: 0,
                parentId: 0,
                menuName: "",
                url: "",
                permit: "",
                menuType: 0,
                visible: 0,
                icon: ""
            },
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
        addMenu: function(row) {
            var that = this;
            that.menuModel = Object.assign({}, that.emptyMenu);
            if (row) {
                that.menuModel.parentId = row.id;
            }
            that.dialogTableVisible = true;
        },
        editMenu: function(row) {
            var that = this;
            that.menuModel = Object.assign({}, row);
            that.dialogTableVisible = true;
        },
        saveMenu() {
            var that = this;
            this.$ajax
                .post(this.$baseUrl + "/system/saveMenu", that.menuModel)
                .then(function(response) {
                    if (response.data.code == 1000) {
                        that.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        that.dialogTableVisible = false;
                        that.getMenuList();
                    } else {
                        that.$alert(response.data.message);
                    }
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        confirmDelete(row) {
            var that = this;
            this.$confirm("确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.deleteMenu(row);
                })
                .catch(() => {});
        },
        deleteMenu(row) {
            var that = this;
            this.$ajax
                .post(this.$baseUrl + "/system/deleteMenu", row)
                .then(function(response) {
                    if (response.data.code == 1000) {
                        that.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        that.dialogTableVisible = false;
                        that.getMenuList();
                    } else {
                        that.$alert(response.data.message);
                    }
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        }
    }
};
</script>