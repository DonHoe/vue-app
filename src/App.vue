<template>
  <div id="app">
    <el-container>
        <el-header style="background: #20a0ff;">
            <el-row>
                <el-col :span="20">
                    <div style="color:#fff;font-size:34px;">Manage</div>
                </el-col>
                <el-col :span="4">
                    <div></div>                    
                </el-col>
            </el-row>
        </el-header>
        <el-container style="min-height:600px;">
            <el-aside width="200px" style="min-height:100%"> 
                <el-menu style="min-height: 100%;" router :collapse="isCollapse">
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>设置</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="home1">设置1</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main style="min-height:100%">
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isCollapse: false
    };
  },
  created() {
    var that = this;
    //console.log(this.$router.options.routes);
  },
  computed: {}
};
</script>

<style>
body {
  margin: 0;
}
</style>
