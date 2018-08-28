<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息</el-breadcrumb-item>
                <el-breadcrumb-item>日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <sc-search>
                <el-form :inline="true" :model="searchModel" size="mini" label-width="100px">
                    <el-form-item label="类名">
                        <el-input v-model="searchModel.callerClass" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item label="方法">
                        <el-input v-model="searchModel.callerMethod" class="input" ></el-input>
                    </el-form-item>

                    <el-form-item label="日志级别">
                        <el-select v-model="searchModel.levelString" clearable = "true" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="过滤1">
                        <el-input v-model="searchModel.arg1" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item label="过滤2">
                        <el-input v-model="searchModel.arg2" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item label="过滤3">
                        <el-input v-model="searchModel.arg3" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item label="过滤4">
                        <el-input v-model="searchModel.arg4" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-date-picker v-model="searchModel.startTime" type="datetime" value-format="timestamp" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker v-model="searchModel.endTime" type="datetime" value-format="timestamp" placeholder="选择日期时间">
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
                <el-table :data="list" tooltip-effect="light" border stripe size="small">
                    <el-table-column prop="timestmp" width="150px" label="时间"></el-table-column>
                    <el-table-column width="85px" label="日志级别">
                        <template slot-scope="scope">
                            <el-tag type="success">{{scope.row.levelString}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="formattedMessage" :show-overflow-tooltip="true" label="日志消息"></el-table-column>
                    <el-table-column prop="callerClass" :show-overflow-tooltip="true" width="300px" label="类名"></el-table-column>
                    <el-table-column prop="callerMethod" :show-overflow-tooltip="true" width="150px" label="方法名"></el-table-column>
                    <el-table-column prop="callerLine" width="50px" label="行数"></el-table-column>
                    <el-table-column width="80px"  label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini">详情</el-button>
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
var baseUrl = "http://localhost:8080/";
export default {
  data() {
    return {
      options: [
        {
          value: "DEBUG",
          label: "DEBUG"
        },
        {
          value: "INFO",
          label: "INFO"
        },
        {
          value: "WARN",
          label: "WARN"
        },
        {
          value: "ERROR",
          label: "ERROR"
        },
        {
          value: "FATAL",
          label: "FATAL"
        }
      ],
      searchModel: {
        callerClass: "",
        callerMethod: "",
        levelString: "",
        arg1: "",
        arg2: "",
        arg3: "",
        arg4: "",
        startTime: "",
        endTime: "",
        page: 1,
        row: 50
      },
      list: [],
      totalRecords: 0,
      mCurrPageSize: 50,
      mCurrPage: 1
    };
  },
  created: function() {
    var that = this;
  },
  methods: {
    search: function() {
      var that = this;
      var queryModel = Object.assign({}, that.searchModel);
      queryModel.page = that.mCurrPage;
      queryModel.row = that.mCurrPageSize;
      console.log(queryModel);
      this.$ajax
        .get(baseUrl + "log/getList", { params: queryModel })
        .then(function(response) {
          that.list = response.data.result.list;
          that.totalRecords = response.data.result.total;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getLogLevelStyle(level) {
      var style = "";
      return style;
    },
    pageChange: function() {
      var that = this;
      that.search();
    },
    changeSize: function(val) {
      var that = this;
      that.mCurrPageSize = val;
      that.pageChange();
    },
    changeCurrent: function(val) {
      var that = this;
      that.mCurrPage = val;
      that.pageChange();
    }
  }
};
</script>

