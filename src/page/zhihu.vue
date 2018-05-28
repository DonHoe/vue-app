<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息</el-breadcrumb-item>
                <el-breadcrumb-item>问答</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <v-search>
                <el-form :inline="true" :model="searchModel" size="mini" label-width="100px">
                    <el-form-item label="标题">
                        <el-input v-model="search.title" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="search.content" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-date-picker v-model="search.startDate" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker v-model="search.endDate" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-button @click="search" size="mini">查询</el-button>
                </el-form>
            </v-search>
        </div>
        <div>
            <el-table :data="list" border stripe>
                <el-table-column prop="id" label="Id"></el-table-column>
                <el-table-column prop="name" label="名字"></el-table-column>
                <el-table-column prop="region" label="区域"></el-table-column>
                <el-table-column prop="province" label="省份"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <el-table-column prop="cdate" label="日期"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      searchModel: {
        title: "",
        content: "",
        startDate: "",
        endDate: ""
      },
      list: []
    };
  },
  methods: {
    search: function() {
      var that = this;
      this.$ajax
        .get("/api/getData")
        .then(function(response) {
          that.list = response.data.list;
          console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>