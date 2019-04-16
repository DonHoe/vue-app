<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息</el-breadcrumb-item>
                <el-breadcrumb-item>问答</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <sc-search>
                <el-form :inline="true" :model="searchModel" size="mini" label-width="100px">
                    <el-form-item label="标题">
                        <el-input v-model="searchModel.title" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="searchModel.content" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-date-picker v-model="searchModel.startDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker v-model="searchModel.endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="search" size="mini">查询</el-button>
                    </el-form-item>
                </el-form>
            </sc-search>
        </div>
        <div style="margin-top: 20px;">
            <div>
                <el-table :data="list" border stripe size="small">
                    <el-table-column prop="id" label="Id"></el-table-column>
                    <el-table-column prop="name" label="名字"></el-table-column>
                    <el-table-column prop="region" label="区域"></el-table-column>
                    <el-table-column prop="province" label="省份"></el-table-column>
                    <el-table-column prop="city" label="城市"></el-table-column>
                    <el-table-column prop="cdate" label="日期"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleClick(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="margin-top: 10px;">
                <el-pagination layout="total, sizes, prev, pager, next, jumper" 
                :total="totalRecords" :current-page="mCurrPage" :page-size="mCurrPageSize"
                @size-change="changeSize" @current-change="changeCurrent">
                </el-pagination>
            </div>
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
      list: [],
      totalRecords: 10,
      mCurrPageSize:10,
      mCurrPage:1
    };
  },
  created:function(){
      var that = this;
      that.search();
  },
  methods: {
    search: function() {
      var that = this;
      window.console.log(that.searchModel);
      this.$ajax
        .get("/api/getData")
        .then(function(response) {
          that.list = response.data.list;
          that.totalRecords = response.data.count;
        })
        .catch(function(err) {
          window.console.log(err);
        });
    },
    pageChange:function(){
        var that = this;
        that.search();
    },
    changeSize:function(val){
        var that = this;  
        that.mCurrPageSize = val;
        that.pageChange();
    },
    changeCurrent:function(val){
        var that = this;
        that.mCurrPage = val;
        that.pageChange();
    },
    handleClick:function(row){
        window.console.log(row);
    }
  }
};
</script>