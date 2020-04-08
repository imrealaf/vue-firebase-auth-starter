<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <h1 class="display-1">Create Article</h1>

      <v-btn class="mt-2 px-6" rounded color="white" outlined height="40" @click.prevent="goBack">
        <v-icon small class="mr-1">mdi-close</v-icon>Cancel
      </v-btn>
    </div>
    <div class="keyline mt-3 mb-4" />
    <ArticleForm mode="create" :user="user" :data="data" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ArticleForm from '@/components/ArticleForm/ArticleForm.vue';
import { goBack } from '@/utils';

export default {
  components: {
    ArticleForm
  },
  data() {
    return {
      loading: true
    };
  },

  computed: {
    goBack,
    ...mapState({
      user: (state) => state.user.data
    })
  },

  methods: {
    ...mapActions({
      //getAllByUserId: 'articles/getById'
    }),

    isValid() {
      return this.data;
    }
  },

  mounted() {}
};
</script>

