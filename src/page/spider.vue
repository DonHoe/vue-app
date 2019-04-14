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
        <el-row :gutter="2">
          <el-col :span="2">
            <el-button @click="search" size="mini">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="add" size="mini">新增</el-button>
          </el-col>
        </el-row>
      </sc-search>
    </div>
    <div style="margin-top: 20px;">
      <div>
        <el-table :data="list" border stripe size="small">
          <el-table-column prop="id" label="Id"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="desc" label="备注"></el-table-column>
          <el-table-column prop="sleepTime" label="间隔ms"></el-table-column>
          <el-table-column prop="retryTimes" label="重试"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{statusEmun[scope.row.status]}}</template>
          </el-table-column>
          <el-table-column label="操作" width="220px">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status != 1" size="mini" type="success" @click="start(scope.row)">启动</el-button>
              <el-button v-if="scope.row.status == 1" size="mini" type="warning" @click="stop(scope.row)">停止</el-button>
              <el-button size="mini" type="info" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="表单" :visible.sync="dialogFormVisible">
        <el-form :model="dataItem" label-width="80px" size="mini" label-suffix=":">
          <el-row>
            <el-col :span="11">
              <el-form-item label="活动名称">
                <el-input v-model="dataItem.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="活动描述">
                <el-input v-model="dataItem.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="重试">
                <el-input type="number" v-model="dataItem.retryTimes"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="间隔ms">
                <el-input type="number" v-model="dataItem.sleepTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="起始">
                <el-input v-model="dataItem.startUrl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="代理">
                <el-input v-model="dataItem.userAgent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="地址提取">
            <el-row>
              <el-col :offset="21" :span="2">
                <el-button size="mini" type="primary" circle icon="el-icon-plus" @click="addRegexTargetUrl"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label>
            <el-row class="form-row" v-for="(item,index) in dataItem.regexTargetUrls" :key="index" v-model="dataItem.regexTargetUrls[index]" type="flex" justify="left" align="middle" :gutter="10">
              <el-col :span="22">
                <el-input v-model="dataItem.regexTargetUrls[index]"></el-input>
              </el-col>
              <el-col :span="1">
                <el-button icon="el-icon-minus" size="mini" circle @click="deleteTargetUrl(index)"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="字段提取">
            <el-row>
              <el-col :offset="21" :span="2">
                <el-button size="mini" type="primary" circle icon="el-icon-plus" @click="addExtractField"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label>
            <el-row class="form-row" v-for="(value, index) in dataItem.extractFields" :key="index" type="flex" justify="left" align="middle" :gutter="10">
              <el-col :span="4">
                <el-input v-model="dataItem.extractFields[index].field"></el-input>
              </el-col>
              <el-col :span="1" class="line">-</el-col>
              <el-col :span="17">
                <el-input v-model="dataItem.extractFields[index].rule"></el-input>
              </el-col>
              <el-col :span="1">
                <el-button icon="el-icon-minus" size="mini" circle @click="deleteExtractField(index)"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      list: [],
      emptyDataItem: {
        name: "",
        desc: "",
        startUrl: "",
        userAgent: "",
        sleepTime: "",
        retryTimes: "",
        regexTargetUrls: [],
        extractFields: []
      },
      dataItem: {},
      statusEmun: { 0: "初始", 1: "执行", 2: "暂停" },
      loadingOption: {
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading"
      }
    };
  },
  created: function() {
    var that = this;
    that.search();
  },
  methods: {
    add: function() {
      var that = this;
      that.dataItem = JSON.parse(JSON.stringify(that.emptyDataItem));
      that.dialogFormVisible = true;
    },
    edit: function(row) {
      var that = this;
      //浅拷贝,内部数组会同步修改
      //that.dataItem = Object.assign({}, row);
      that.dataItem = JSON.parse(JSON.stringify(row));
      that.dialogFormVisible = true;
    },
    addRegexTargetUrl: function() {
      var that = this;
      that.dataItem.regexTargetUrls.push("");
    },
    addExtractField: function() {
      var that = this;
      that.dataItem.extractFields.push({ field: "", rule: "" });
    },
    deleteTargetUrl: function(index) {
      var that = this;
      that.dataItem.regexTargetUrls.splice(index, 1);
    },
    deleteExtractField: function(index) {
      var that = this;
      that.dataItem.extractFields.splice(index, 1);
    },
    start: function(row) {
      var that = this;
      var loading = this.$loading(that.loadingOption);
      this.$ajax
        .get(this.$baseUrl + "/job/startSpider?key=" + row.key)
        .then(function(response) {
          loading.close();
          if (response.data.code == 1000) {
            that.$message.success("成功");
            that.dialogFormVisible = false;
            row.status = response.data.result;
          } else {
            that.$message(response.data.message);
          }
        })
        .catch(function(err) {
          loading.close();
        });
    },
    stop: function(row) {
      var that = this;
      var loading = this.$loading(that.loadingOption);
      this.$ajax
        .get(this.$baseUrl + "/job/stopSpider?key=" + row.key)
        .then(function(response) {
          loading.close();
          if (response.data.code == 1000) {
            that.$message.success("成功");
            that.dialogFormVisible = false;
            row.status = response.data.result;
          } else {
            that.$message(response.data.message);
          }
        })
        .catch(function(err) {
          loading.close();
        });
    },
    save: function() {
      var that = this;
      var loading = this.$loading(that.loadingOption);
      this.$ajax
        .post(this.$baseUrl + "/job/saveSpiderConfig", that.dataItem)
        .then(function(response) {
          loading.close();
          if (response.data.code == 1000) {
            that.$message.success("成功");
            that.dialogFormVisible = false;
          } else {
            that.$message(response.data.message);
          }
        })
        .catch(function(err) {
          loading.close();
          console.log(err);
        });
    },
    search: function() {
      var that = this;
      this.$ajax
        .get(this.$baseUrl + "/job/getSpiderList")
        .then(function(response) {
          that.list = response.data.result;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.line {
  text-align: center;
}
.form-row {
  margin-bottom: 10px;
}
</style>

