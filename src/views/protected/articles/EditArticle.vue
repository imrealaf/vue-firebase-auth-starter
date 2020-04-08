<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <h1 class="display-1">Edit Article</h1>
      <v-btn class="mt-2 px-6" rounded color="white" outlined height="40" @click.prevent="goBack">
        <v-icon small class="mr-1">mdi-chevron-left</v-icon>Go Back
      </v-btn>
    </div>
    <div class="keyline mt-3 mb-4" />
    <ArticleForm mode="edit" :user="user" :data="data" :class="{'is-invisible': loading}" />
    <v-fade-transition>
      <div v-show="loading" class="loading-box cover">
        <v-progress-circular :size="50" color="grey ligthen-2" indeterminate></v-progress-circular>
      </div>
    </v-fade-transition>
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
      loading: true,
      data: {}
    };
  },

  mounted() {
    this.getArticle();
  },

  computed: {
    ...mapState({
      user: (state) => state.user.data
    })
  },

  methods: {
    goBack,
    ...mapActions({
      getById: 'article/getById'
    }),

    async getArticle() {
      try {
        this.data = await this.getById(this.$route.params.id);
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

