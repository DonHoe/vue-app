<template>
    <div class="sc-search-panel">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "sc-search",
  data() {
    return {};
  },
  methods: {

  }
};
</script>

<style>
.sc-search-panel {
  padding: 20px 10px 5px 10px;
  border-radius: 5px;
  border: 1px solid;
  margin-top: 17px;
  border-color: lightgrey;
}
</style>