<template>
  <div id="app">
    <component v-bind:is="layout">
      <transition name="page">
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>
<script>
export default {
  computed: {
    layout() {
      const layout = this.$route.meta.layout;
      return `${layout || 'auth'}-layout`;
    }
  },
  mounted() {}
};
</script>
