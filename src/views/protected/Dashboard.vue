<template>
  <v-layout column>
    <v-flex>
      <h1 v-if="profile">Welcome {{profile.firstName}}</h1>
      <h1 v-else>Welcome {{user.displayName}}</h1>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { db } from '@/services/firebase';

export default {
  computed: {
    ...mapState({
      user: (state) => state.user.data,
      profile: (state) => state.user.profile
    })
  },
  methods: {},
  mounted() {}
};
</script>
