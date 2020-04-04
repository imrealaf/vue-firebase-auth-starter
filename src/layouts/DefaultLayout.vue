<template>
  <v-app dark v-show="loaded">
    <v-content>
      <slot></slot>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['loaded'])
  }
};
</script>
