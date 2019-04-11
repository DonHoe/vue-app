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
            <el-aside width="200px" style="min-height:100%;"> 
                <el-menu style="min-height: 100%;" router :collapse="isCollapse">
                    <el-menu-item index="main">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-info"></i>
                            <span>信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="zhihu"><i class="el-icon-question"></i>问答</el-menu-item>
                            <el-menu-item index="chart"><i class="el-icon-menu"></i>报表</el-menu-item>
                            <el-menu-item index="log"><i class="el-icon-tickets"></i>日志</el-menu-item>
                            <el-menu-item index="spider"><i class="el-icon-bell"></i>工作</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>系统</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="setting"><i class="el-icon-setting"></i>设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main style="min-height:100%;">
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
