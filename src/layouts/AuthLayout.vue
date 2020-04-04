<template>
  <v-app dark v-show="loaded" :style="{background: bg}">
    <v-content>
      <slot></slot>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import config from '../config/vuetify';

export default {
  computed: {
    ...mapState(['loaded']),
    bg() {
      return config.theme.themes.dark.primary;
    }
  }
};
</script>
