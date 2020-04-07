<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1>Articles</h1>
      <v-btn class="btn-pill" color="primary" small>
        <v-icon small>mdi-plus</v-icon>Create Article
      </v-btn>
    </div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search articles ..."
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="articles" :search="search">
        <template v-slot:item.title="{ item }">
          <span>{{ item.title }}</span>
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
        },
        {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'isPublished'
        }
      ],
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

    async getArticles() {
      try {
        this.articles = await this.getAllByUserId({
          userId: this.user.uid
        });
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
