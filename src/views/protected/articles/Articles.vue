<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <h1 class="display-1">Articles</h1>
      <v-btn class="mt-2 px-6" rounded color="primary" height="40" outlined @click="goToCreate">
        <v-icon small class="mr-1">mdi-plus</v-icon>Create
      </v-btn>
    </div>
    <div class="keyline mt-3 mb-6" />
    <v-card :class="{'is-invisible': loading}">
      <v-card-title class="mb-3">
        <v-spacer></v-spacer>
        <v-text-field
          class="title"
          height="40"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search articles ..."
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="articles"
        :search="search"
        @click:row="onArticleClick"
      >
        <template v-slot:item.title="{ item }">
          <span class="d-block" :style="{cursor: 'pointer'}">{{ item.title }}</span>
        </template>
        <template v-slot:item.slug="{ item }">
          <span>{{ item.slug }}</span>
        </template>
        <template v-slot:item.isPublished="{ item }">
          <span
            :class="item.isPublished ? 'success--text' : 'warning--text'"
          >{{item.isPublished ? 'Published' : 'Draft'}}</span>
        </template>
        <template v-slot:item.dateCreated="{ item }">
          <span>{{ item.dateCreated.toDate() | formatDate }}</span>
        </template>
        <template v-slot:item.dateUpdated="{ item }">
          <span>{{ item.dateUpdated ? item.dateUpdated.toDate() : null | formatDateTime }}</span>
        </template>
      </v-data-table>
    </v-card>
    <v-fade-transition>
      <div v-show="loading" class="loading-box cover">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: true,
          value: 'title'
        },

        {
          text: 'Slug',
          align: 'start',
          sortable: true,
          value: 'slug'
        },
        {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'isPublished'
        },
        {
          text: 'Date Created',
          align: 'start',
          sortable: true,
          value: 'dateCreated'
        },
        {
          text: 'Date Updated',
          align: 'start',
          sortable: true,
          value: 'dateUpdated'
        }
      ],
      loading: true,
      articles: []
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.data
    })
  },
  methods: {
    ...mapActions({
      getAllByUserId: 'articles/getAllByUserId'
    }),

    goToCreate() {
      this.$router.push({
        name: 'admin-create-article'
      });
    },

    onArticleClick(article) {
      this.$router.push({
        name: 'admin-edit-article',
        params: {
          id: article.id
        }
      });
    },

    async getArticles() {
      try {
        this.articles = await this.getAllByUserId({
          userId: this.user.uid
        });
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    }
  },

  mounted() {
    this.getArticles();
  }
};
</script>
