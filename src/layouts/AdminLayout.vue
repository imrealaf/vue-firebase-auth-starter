<template>
  <v-app :dark="darkMode">
    <Header :color="'red accent-3'" :isTransparent="isHeaderTransparent" :navItems="navItems" />
    <v-content>
      <v-container fluid class="py-5 px-7">
        <slot></slot>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import navigation from '../config/navigation';

export default {
  components: { Header, Footer },
  data() {
    return {
      navItems: navigation || []
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.theme.dark;
    },
    isHeaderTransparent() {
      return false;
    }
  },
  methods: {
    ...mapMutations({
      toggleTheme: 'theme/toggle'
    })
  }
};
</script>
