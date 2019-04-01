<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>信息</el-breadcrumb-item>
        <el-breadcrumb-item>问答</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-top: 20px;">
      <div>
        <el-table :data="list" border stripe size="small">
          <el-table-column prop="id" label="Id"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="desc" label="备注"></el-table-column>
          <el-table-column prop="sleepTime" label="间隔"></el-table-column>
          <el-table-column prop="retryTimes" label="重试"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{statusEmun[scope.row.status]}}</template>
          </el-table-column>
          <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="表单" :visible.sync="dialogFormVisible">
        <el-form :model="dataItem" label-width="80px" size="mini" label-suffix=":">
          <el-form-item label="活动名称">
            <el-input v-model="dataItem.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-input v-model="dataItem.desc"></el-input>
          </el-form-item>
          <el-form-item label="重试">
            <el-input v-model="dataItem.retryTimes"></el-input>
          </el-form-item>
          <el-form-item label="间隔">
            <el-input v-model="dataItem.sleepTime"></el-input>
          </el-form-item>
          <el-form-item label="起始">
            <el-input v-model="dataItem.startUrl"></el-input>
          </el-form-item>
          <el-form-item label="代理">
            <el-input v-model="dataItem.userAgent"></el-input>
          </el-form-item>
          <el-form-item label="地址提取" style="text-align: right;">
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="addregexTargetUrl"></el-button>
          </el-form-item>
          <el-form-item label>
            <el-input
              v-for="(item,index) in dataItem.regexTargetUrls"
              :key="index"
              v-model="dataItem.regexTargetUrls[index]"
            ></el-input>
          </el-form-item>
          <el-form-item label="字段提取" style="text-align: right;">
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="addextractField"></el-button>
          </el-form-item>
          <el-form-item label>
            <el-row v-for="(value, index) in dataItem.extractFields" :key="index">
              <el-col :span="11">
                <el-input v-model="dataItem.extractFields[index].field"></el-input>
              </el-col>
              <el-col :span="2" class="line">-</el-col>
              <el-col :span="11">
                <el-input v-model="dataItem.extractFields[index].rule"></el-input>
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
var baseUrl = "http://localhost:8090";
export default {
  data() {
    return {
      dialogFormVisible: false,
      list: [],
      dataItem: {
        regexTargetUrls: [],
        extractFields: []
      },
      statusEmun: { 0: "初始", 1: "执行", 2: "暂停" }
    };
  },
  created: function() {
    var that = this;
    that.search();
  },
  methods: {
    edit: function(row) {
      var that = this;
      that.dataItem = row;
      that.dialogFormVisible = true;
    },
    addregexTargetUrl: function() {
      var that = this;
      that.dataItem.regexTargetUrls.push("");
    },
    addextractField: function() {
      var that = this;
      that.dataItem.extractFields.push({ field: "", rule: "" });
    },
    save: function() {
      var that = this;
      this.$ajax
        .post(baseUrl + "/job/saveSpiderConfig", that.dataItem)
        .then(function(response) {
          if (response.data.code == 1000) {
            that.$message.success("成功");
            that.dialogFormVisible = false;
          } else {
            that.$message(response.data.message);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    search: function() {
      var that = this;
      this.$ajax
        .get(baseUrl + "/job/getSpiderList")
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

