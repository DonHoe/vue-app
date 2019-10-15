<template>
    <div id="">
        <el-container>
            <el-header style="background: #20a0ff;">
                <el-row>
                    <el-col :span="20">
                        <div style="color:#fff;font-size:34px;height:50px;">Manage</div>
                    </el-col>
                    <el-col :span="4">
                        <div style="height:60px;">
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container style="min-height:600px;">
                <el-aside id="home-aside" width="200px" style="min-height:100%;">
                    <el-menu style="min-height: 100%;" router :collapse="isCollapse">
                        <el-menu-item index="main">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>

                        <el-submenu v-for="menu in menuList" :index="menu.url" :key="menu.id">
                            <template slot="title">
                                <i :class="menu.icon"></i>
                                <span>{{menu.menuName}}</span>
                            </template>
                            <el-menu-item v-for="subMenu in menu.children" :index="subMenu.url" :key="subMenu.id">
                                <i :class="subMenu.icon"></i>{{subMenu.menuName}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main id="home" style="min-height:100%;">
                    <keep-alive>
                        <router-view />
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            menuList: []
        };
    },
    created() {
        this.initMenu();
    },
    computed: {},
    methods: {
        initMenu: function() {
            var that = this;
            this.$ajax
                .get(this.$baseUrl + "/system/getMenuList")
                .then(function(response) {
                    that.menuList = response.data.result;
                })
                .catch(function(err) {
                    window.console.log(err);
                });
        }
    }
};
</script>

<style>
body {
    margin: 0;
}
</style>
