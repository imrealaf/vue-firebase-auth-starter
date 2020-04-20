<template>
  <v-form novalidate @submit.prevent="submit">
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
                :counter="maxTitleLength"
                v-model="data.title"
                :maxlength="maxTitleLength"
                label="Title"
                @input="slugify"
                @blur="onDataChanged"
                @change="onDataChanged"
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="4" class="pos-relative">
              <button type="button" class="slug-edit" @click.prevent="toggleEditSlug">
                <v-icon v-if="!isEditSlug" small>mdi-pencil</v-icon>
                <v-icon v-else small>mdi-close</v-icon>
              </button>
              <v-text-field
                height="40"
                class
                v-model="data.slug"
                label="Slug"
                :maxlength="maxSlugLength"
                :counter="maxSlugLength"
                @input="slugify"
                :disabled="!isEditSlug"
                :readonly="!isEditSlug"
                @change="onDataChanged"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-3">
            <v-col cols="12">
              <v-textarea
                no-resize
                v-model="data.summary"
                label="Summary"
                @blur="onDataChanged"
                @change="onDataChanged"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <Editor
                api-key="vmalv2n85kqixdmq2ctnbz46a2eix597asx5vsn0j9zek76e"
                :init="editorConfig"
                v-model="data.content"
                @onChange="onDataChanged"
                @onBlur="onDataChanged"
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
                @change="onDataChanged"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="data.dateCreated" no-title scrollable @change="onDataChanged">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(data.dateCreated)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-switch
            v-model="data.isPublished"
            class="ma-2"
            @change="onDataChanged"
            :label="data.isPublished ? 'Published' : 'Unpublished'"
          ></v-switch>
        </v-card>
        <div class="actions mt-8">
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
          <v-fade-transition>
            <v-btn
              v-show="!$v.$invalid"
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
          </v-fade-transition>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script src="./ArticleForm.js"></script>
<style lang="scss" scoped>
@import 'ArticleForm.scss';
</style>