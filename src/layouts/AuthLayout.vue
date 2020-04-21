<template>
  <v-app light :style="{background: bg}">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import config from '@/config/vuetify';

export default {
  /**
   * -------------------------------------------------------------------
   *  Computed
   * -------------------------------------------------------------------
   */
  computed: {
    ...mapState(['loaded']),
    bg() {
      return `${config.theme.themes.dark.primary} !important`;
    }
  }
};
</script>
