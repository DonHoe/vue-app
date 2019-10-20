<template>
    <el-container style="height: 100%;">
        <el-header height="">
            <el-form :inline="true" :model="searchModel" size="mini" label-width="80px" label-position="left" label-suffix=":">
                <el-form-item label="角色">
                    <el-input v-model="searchModel.roleName" class="query-width"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="searchModel.roleKey" class="query-width"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button size="mini" title="" icon="el-icon-search" @click="getRoleList()">查询</el-button>
                    <el-button size="mini" title="" icon="el-icon-plus" @click="addRole()">新增</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-container>
            <el-main>
                <el-table :data="roleList" row-key="id" stripe border size="small" style="">
                    <el-table-column prop="roleName" label="角色名" width="180">
                    </el-table-column>
                    <el-table-column prop="roleKey" label="角色键" width="180">
                    </el-table-column>
                    <el-table-column prop="columnComment" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" title="编辑" icon="el-icon-edit-outline" @click="editRole(scope.row)"></el-button>
                            <el-button size="mini" type="danger" title="删除" icon="el-icon-delete" @click="confirmDelete(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="角色" :visible.sync="dialogTableVisible" width="30%" :close-on-click-modal="false">
                    <el-form ref="roleModel" :model="roleModel" label-width="80px" size="small">
                        <input type="hidden" v-model="roleModel.id" />
                        <el-form-item label="角色名称">
                            <el-input v-model="roleModel.roleName"></el-input>
                        </el-form-item>
                        <el-form-item label="角色键">
                            <el-input v-model="roleModel.roleKey"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-tree :data="menuData" show-checkbox node-key="id" :default-checked-keys="menuIds" :props="{children: 'children',label: 'menuName'}">
                            </el-tree>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveRole()">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>
<style>
</style>
<script>
export default {
    data() {
        return {
            roleList: [],
            roleModel: {},
            emptyRole: {
                id: 0,
                roleName: "",
                roleKey: ""
            },
            menuData: [],
            menuIds: [],
            searchModel: {},
            dialogTableVisible: false
        };
    },
    created: function() {
        var that = this;
        that.getRoleList();
        that.getMenuList();
    },
    methods: {
        getRoleList() {
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/system/getRoleList")
                .then(function(response) {
                    that.roleList = response.data.result;
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        getMenuList() {
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/system/getMenuList")
                .then(function(response) {
                    that.menuData = response.data.result;
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        getMenuIdByRoleId(roleId) {
            var that = this;
            this.$ajax
                .get(
                    this.$baseUrl + "/system/getMenuIdByRoleId?roleId=" + roleId
                )
                .then(function(response) {
                    that.menuIds = response.data.result;
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        addRole: function() {
            var that = this;
            that.roleModel = Object.assign({}, that.emptyRole);
            that.menuIds = [];
            that.dialogTableVisible = true;
        },
        editRole: function(row) {
            var that = this;
            that.roleModel = Object.assign({}, row);
            that.getMenuIdByRoleId(row.id);
            that.dialogTableVisible = true;
        },
        saveRole() {
            var that = this;
            var requestData = Object.assign({},that.roleModel);
            requestData.menuIds = that.menuIds;
            this.$ajax
                .post(this.$baseUrl + "/system/saveRole", that.requestData)
                .then(function(response) {
                    if (response.data.code == 1000) {
                        that.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        that.dialogTableVisible = false;
                        that.getRoleList();
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
                    that.deleteRole(row);
                })
                .catch(() => {});
        },
        deleteRole(row) {
            var that = this;
            this.$ajax
                .post(this.$baseUrl + "/system/deleteRole", row)
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