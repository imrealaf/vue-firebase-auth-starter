<template>
  <v-flex>My Profile</v-flex>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
