<template>
    <el-container style="height: 100%;">
        <el-header height="">
            <el-form :inline="true" :model="searchModel" size="mini" label-width="80px" label-position="left" label-suffix=":">
                <el-form-item label="用户名">
                    <el-input v-model="searchModel.userName" class="query-width"></el-input>
                </el-form-item>
                <el-form-item label="登录名">
                    <el-input v-model="searchModel.loginName" class="query-width"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button size="mini" title="" icon="el-icon-search" @click="getUserList()">查询</el-button>
                    <el-button size="mini" title="" icon="el-icon-plus" @click="addUser()">新增</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-container>
            <el-main>
                <el-table :data="userList" row-key="id" stripe border size="small" style="">
                    <el-table-column prop="userName" label="用户名" width="180">
                    </el-table-column>
                    <el-table-column prop="loginName" label="登录名" width="180">
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号码" width="180">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="80">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" :formatter="dateFormatter" width="180">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" :formatter="dateFormatter" width="180">
                    </el-table-column>
                    <el-table-column prop="columnComment" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" title="编辑" icon="el-icon-edit-outline" @click="editUser(scope.row)"></el-button>
                            <el-button size="mini" type="danger" title="删除" icon="el-icon-delete" @click="confirmDelete(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="用户" :visible.sync="dialogTableVisible" width="40%" :close-on-click-modal="false">
                    <el-form ref="userModel" :model="userModel" label-width="80px" size="small">
                        <input type="hidden" v-model="userModel.id" />
                        <el-form-item label="用户名">
                            <el-input v-model="userModel.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="登录名">
                            <el-input v-model="userModel.loginName"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input v-model="userModel.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-input v-model="userModel.status"></el-input>
                        </el-form-item>
                        <el-form-item label="角色">
                            <el-tree ref="tree" :data="roleTreeData" show-checkbox node-key="id" :props="{children: 'children',label: 'roleName'}">
                            </el-tree>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveUser()">保存</el-button>
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
import moment from "moment";
export default {
    data() {
        return {
            userList: [],
            userModel: {},
            emptyUser: {
                id: 0,
                userName: "",
                loginName: "",
                phone: "",
                status: 0
            },
            roleData: [],
            roleTreeData: [],
            searchModel: {},
            dialogTableVisible: false
        };
    },
    created: function() {
        var that = this;
        that.getUserList();
        that.getRoleList();
    },
    methods: {
        getUserList() {
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/system/getUserList")
                .then(function(response) {
                    that.userList = response.data.result;
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        getRoleList() {
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/system/getRoleList")
                .then(function(response) {
                    that.roleData = response.data.result;
                    that.roleTreeData = [].concat(that.roleData);
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        getRoleIdByUserId(userId) {
            var that = this;
            this.$ajax
                .get(
                    this.$baseUrl + "/system/getRoleIdByUserId?userId=" + userId
                )
                .then(function(response) {
                    that.$refs.tree.setCheckedKeys(response.data.result);
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        },
        addUser: function() {
            var that = this;
            that.roleTreeData = [].concat(that.roleData);
            that.userModel = Object.assign({}, that.emptyUser);
            that.dialogTableVisible = true;
            this.$nextTick(() => {
                that.$refs.tree.setCheckedKeys([]);
            });
        },
        editUser: function(row) {
            var that = this;
            that.roleTreeData = [].concat(that.roleData);
            that.userModel = Object.assign({}, row);
            that.dialogTableVisible = true;
            that.getRoleIdByUserId(row.id);
        },
        saveUser() {
            var that = this;
            var requestData = Object.assign({}, that.userModel);
            requestData.roleIds = that.$refs.tree.getCheckedKeys();
            this.$ajax
                .post(this.$baseUrl + "/system/saveUser", requestData)
                .then(function(response) {
                    if (response.data.code == 1000) {
                        that.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        that.dialogTableVisible = false;
                        that.getUserList();
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
                    that.deleteUser(row);
                })
                .catch(() => {});
        },
        deleteUser(row) {
            var that = this;
            this.$ajax
                .post(this.$baseUrl + "/system/deleteUser", row)
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
        },
        dateFormatter: function(row, column, cellValue, index) {
            window.console.log(row);
            window.console.log(column);
            window.console.log(cellValue);
            window.console.log(index);
            if(cellValue){
                //"YYYY-MM-DD HH:mm:ss"
                return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
            }
            return '';
        }
    }
};
</script>