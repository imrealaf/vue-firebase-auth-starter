<template>
  <v-app :dark="darkMode">
    <Preloader :show="showProloader">Loading...</Preloader>
    <Header color="black" :navItems="navItems" />
    <v-content>
      <v-container fluid class="py-6 px-7">
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import Preloader from '@/components/Preloader/Preloader.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import { protectedNav } from '@/data/navigation';
import { LOADING_DELAY } from '@/constants';

export default {
  /**
   * -------------------------------------------------------------------
   *  Components
   * -------------------------------------------------------------------
   */
  components: { Preloader, Header, Footer },

  /**
   * -------------------------------------------------------------------
   *  Data
   * -------------------------------------------------------------------
   */
  data() {
    return {
      showProloader: true,
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
      user: (state) => state.user.data,
      profile: (state) => state.user.profile,
      darkMode: (state) => state.theme.dark
    }),
    isReady() {
      return this.user && this.profile ? true : false;
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Methods
   * -------------------------------------------------------------------
   */
  methods: {
    ...mapMutations({
      toggleTheme: 'theme/toggle'
    }),

    /**
     * watchLoading
     * @description check if all data is needed before hiding preloader
     */
    watchLoading() {
      const interval = setInterval(() => {
        if (this.isReady) this.onLoaded();
      }, 10);
    },

    /**
     * onLoaded
     * @description check if all data is needed before hiding preloader
     * @param {Function} interval - the interval instance
     */
    onLoaded(interval) {
      setTimeout(() => {
        this.showProloader = false;
      }, LOADING_DELAY);
      clearInterval(interval);
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Mounted
   * -------------------------------------------------------------------
   */
  mounted() {
    this.watchLoading();
  }
};
</script>
