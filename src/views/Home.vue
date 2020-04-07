<template>
  <v-container class="fill-height justify-center flex-column">
    <h1>Home Page</h1>
    <router-link to="login">Login</router-link>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      createUser: 'user/createUser'
    })
  },
  mounted() {}
};
</script>
