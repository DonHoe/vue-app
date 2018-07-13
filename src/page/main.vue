<template>
    <div>
      <el-row :gutter="5">
        <el-col :span="6">
          <div class="tagreport">
            <el-tag>本日完成率</el-tag>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="tagreport">
            <el-tag type="success">本周完成率</el-tag>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="tagreport">
            <el-tag type="info">月度指标</el-tag>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="tagreport">
            <el-tag type="warning">季度指标</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="6">
          <div class="tagreport">
            <el-progress type="circle" :percentage="25"></el-progress>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="tagreport">
            <el-progress type="circle" :percentage="80"></el-progress>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="tagreport">
            <el-progress type="circle" :percentage="90"></el-progress>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="tagreport">
            <el-progress type="circle" :percentage="50"></el-progress>
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getData: function() {
      this.$ajax.get("/api/getData").then(
        response => {
          console.log(response.data);
        },
        response => {
          console.log(response.data);
        }
      );
    }
  }
};
</script>
<style>
.tagreport {
  text-align: center;
  margin-top: 10px;
}
</style>
