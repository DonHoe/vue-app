<template>
    <div>
        <el-button @click="getData()">默认按钮</el-button>
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