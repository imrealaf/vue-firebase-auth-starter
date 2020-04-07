<template>
  <v-layout column>
    <v-flex>
      <h1 v-if="profile">Welcome {{profile.firstName}}</h1>
      <h1 v-else>Welcome {{user.displayName}}</h1>
      <p v-for="article in articles" :key="article.title">{{article.title}}</p>
      <p v-if="article">{{article.title}}</p>
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
      articles: (state) => state.articles.data,
      article: (state) => state.article.data,
      profile: (state) => state.user.profile
    })
  },
  methods: {
    ...mapActions({
      getArticles: 'articles/getAllByUserId',
      getArticle: 'article/getById'
    })
  },
  mounted() {
    this.getArticles({
      userId: this.user.uid,
      isPublished: true
    });
    this.getArticle('GXqgi11jxELzt4EUb03B');
  }
};
</script>
