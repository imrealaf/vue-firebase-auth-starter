<template>
  <v-layout column>
    <v-flex>
      <h1>Home</h1>
      <p>{{user.email}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: mapState(['user'])
};
</script>
