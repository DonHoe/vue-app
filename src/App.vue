<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Components from "./components/index.js";
import router from "./router";
export default {
  name: "app",
  router,
  components: Components
};
</script>