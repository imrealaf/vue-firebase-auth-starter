<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <h1 class="display-1">Create Article</h1>

      <v-btn class="mt-2 px-6" rounded color="white" outlined height="40" @click.prevent="goBack">
        <v-icon small class="mr-1">mdi-close</v-icon>Cancel
      </v-btn>
    </div>
    <div class="keyline mt-3 mb-4" />
    <ArticleForm
      mode="create"
      :user="user"
      :data="data"
      :class="{'is-invisible': loading}"
      :tempSave="saveArticle"
    />
    <v-fade-transition>
      <div v-show="loading" class="loading-box cover">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ArticleForm from '@/components/ArticleForm/ArticleForm.vue';
import { goBack, defer } from '@/utils';

export default {
  components: {
    ArticleForm
  },
  data() {
    return {
      data: {},
      loading: true
    };
  },

  computed: {
    goBack,
    ...mapState({
      user: (state) => state.user.data,
      article: (state) => state.temp.article
    })
  },

  methods: {
    ...mapActions({
      saveArticle: 'temp/saveTempArticle',
      clearArticle: 'temp/clearTempArticle'
    }),

    isValid() {
      return this.data;
    }
  },

  mounted() {
    this.data = this.article;

    defer(() => {
      this.loading = false;
    });

    window.onpopstate = () => {
      this.clearArticle();
    };
  }
};
</script>

