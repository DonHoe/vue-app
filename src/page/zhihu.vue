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
                <el-form :inline="true" :model="search" size="mini" label-width="100px">
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
            
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      search: {
        title: "",
        content:"",
        startDate:"",
        endDate:""
      }
    };
  }
};
</script>