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
                    <el-table-column prop="visible" label="可见" width="150">
                    </el-table-column>
                    <el-table-column prop="columnComment" label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="editMenu(scope.row)">编辑</el-button>
                            <el-button size="mini" type="success" @click="addMenu(scope.row)">新增</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="菜单" :visible.sync="dialogTableVisible">
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
                        <el-form-item label="类型">
                            <el-input v-model="menuModel.menuType"></el-input>
                        </el-form-item>
                        <el-form-item label="可见性">
                            <el-input v-model="menuModel.visible"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveMenu">保存</el-button>
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
                visible: 0
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
                that.menuModel.parentId = row.parentId;
            }
            that.dialogTableVisible = true;
        },
        editMenu: function(row) {
            var that = this;
            that.menuModel = row;
            that.dialogTableVisible = true;
        },
        saveMenu() {
            var that = this;
            this.$ajax
                .post(this.$baseUrl + "/setting/saveMenu", that.menuModel)
                .then(function(response) {
                    that.dialogTableVisible = false;
                    window.console.log(response);
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        }
    }
};
</script>