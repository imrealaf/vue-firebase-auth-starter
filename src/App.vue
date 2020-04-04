<template>
  <component v-bind:is="layout" />
</template>
<script>
import { DEFAULT_LAYOUT } from './constants';

export default {
  computed: {
    /**
     * layout
     * @description get the current route's layout
     * @returns {String}
     */
    layout() {
      const layout = this.$route.meta.layout;
      return `${layout || DEFAULT_LAYOUT}-layout`;
    }
  },
  mounted() {}
};
</script>
