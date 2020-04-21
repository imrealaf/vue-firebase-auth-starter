<template>
  <v-layout column>
    <v-flex>
      <h1>Welcome {{fullName || displayName}}</h1>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { db } from '@/services/firebase';

export default {
  computed: {
    ...mapState({
      user: (state) => state.user.data,
      profile: (state) => state.user.profile
    }),
    ...mapGetters({
      fullName: 'user/fullName',
      displayName: 'user/displayName'
    })
  },
  methods: {},
  mounted() {}
};
</script>
