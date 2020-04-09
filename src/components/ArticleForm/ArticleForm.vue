<template>
  <v-form novalidate>
    <v-row>
      <v-col class="py-0" cols="12" v-show="url">
        <span class="grey--text caption">
          <strong>URL:</strong>
          {{url}}
        </span>
      </v-col>
      <v-col sm="12" md="9">
        <v-card class="elevation-4 pa-6">
          <v-row>
            <v-col sm="12" md="8">
              <v-text-field
                height="40"
                type="text"
                class="title"
                counter="120"
                v-model="data.title"
                maxlength="120"
                label="Title"
                @input="slugify"
                @change="onBlur"
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="4">
              <v-text-field
                height="40"
                class
                v-model="data.slug"
                label="Slug"
                :disabled="!slugEdit"
                :readonly="!slugEdit"
                @change="onBlur"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <Editor
                api-key="vmalv2n85kqixdmq2ctnbz46a2eix597asx5vsn0j9zek76e"
                :init="editorConfig"
                v-model="data.content"
                @change="onBlur"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col sm="12" md="3">
        <v-card class="elevation-4 pa-6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="data.dateCreated"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                height="40"
                class="title"
                v-model="data.dateCreated"
                label="Published Date"
                @change="onBlur"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="data.dateCreated" no-title scrollable @change="onBlur">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(data.dateCreated)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-switch
            v-model="data.isPublished"
            class="ma-2"
            @change="onBlur"
            :label="data.isPublished ? 'Published' : 'Unpublished'"
          ></v-switch>
        </v-card>
        <v-flex class="text-center mt-8">
          <v-btn
            v-show="mode === 'edit'"
            height="50"
            text
            rounded
            class="px-6 mr-3"
            color="primary"
            small
          >
            <v-icon class="mr-2">mdi-delete</v-icon>Delete
          </v-btn>
          <v-btn
            v-show="showSubmit"
            type="submit"
            height="60"
            rounded
            class="px-10"
            color="primary"
            x-large
          >
            <v-icon v-if="mode === 'edit'" class="mr-2">mdi-check</v-icon>
            <v-icon v-else class="mr-2">mdi-plus</v-icon>
            {{mode === 'edit' ? 'Save' : 'Create'}}
          </v-btn>
        </v-flex>
      </v-col>
    </v-row>
  </v-form>
</template>

<script src="./ArticleForm.js"></script>
<style lang="scss" scoped>
@import 'ArticleForm.scss';
</style>