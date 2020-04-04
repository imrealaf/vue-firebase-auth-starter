<template>
  <v-app :dark="darkMode">
    <Header :color="'red accent-3'" :navItems="navItems" />
    <v-content>
      <v-container fluid class="py-5 px-7">
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import { protectedNav } from '@/data/navigation';

export default {
  /**
   * -------------------------------------------------------------------
   *  Components
   * -------------------------------------------------------------------
   */
  components: { Header, Footer },

  /**
   * -------------------------------------------------------------------
   *  Data
   * -------------------------------------------------------------------
   */
  data() {
    return {
      navItems: protectedNav || []
    };
  },

  /**
   * -------------------------------------------------------------------
   *  Computed
   * -------------------------------------------------------------------
   */
  computed: {
    ...mapState({
      darkMode: (state) => state.theme.dark
    })
  },

  /**
   * -------------------------------------------------------------------
   *  Methods
   * -------------------------------------------------------------------
   */
  methods: {
    ...mapMutations({
      toggleTheme: 'theme/toggle'
    })
  }
};
</script>
