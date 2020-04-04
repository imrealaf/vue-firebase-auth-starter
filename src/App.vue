<template>
  <div id="app">
    <component v-bind:is="layout">
      <router-view></router-view>
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
