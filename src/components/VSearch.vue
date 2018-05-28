<template>
    <div class="search-panel">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "v-search",
  data() {
    return {};
  },
  methods: {

  }
};
</script>

<style>
.search-panel {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid;
  margin-top: 17px;
  border-color: lightgrey;
}
</style>