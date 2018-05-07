<template>
  <div id="app">
    <el-container>
        <el-header>Header</el-header>
        <el-container style="min-height:600px;">
            <el-aside width="200px" style="min-height:100%">
                <el-menu style="min-height: 100%;" router>
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>{{name}}
                    </el-menu-item>
                    <el-menu-item index="home1">
                        <i class="el-icon-menu"></i>222
                    </el-menu-item>
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
      name: "测试"
    };
  },
  created() {
    var that = this;
    console.log(this.$router);
  },
  computed: {
  }
};
</script>

<style>

</style>
