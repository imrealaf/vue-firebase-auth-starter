import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import moment from 'moment';

import { generateSlug } from '@/utils';
import { DATE_FORMAT_SYSTEM } from '@/constants';
import Editor from '@tinymce/tinymce-vue';
import config from '@/config/tiny';

export default {
  /**
   * -------------------------------------------------------------------
   *  Mixins
   * -------------------------------------------------------------------
   */
  mixins: [validationMixin],

  components: {
    Editor
  },

  /**
   * -------------------------------------------------------------------
   *  Props
   * -------------------------------------------------------------------
   */
  props: {
    data: {
      required: true,
      type: Object,
      default: () => ({
        userId: '',
        title: '',
        slug: '',
        dateCreated: moment().format(DATE_FORMAT_SYSTEM),
        dateUpdated: null,
        isPublished: false,
        summary: '',
        content: '',
        photo: null
      })
    },
    mode: {
      required: true,
      type: String,
      default: 'create'
    },
    id: {
      type: String
    },
    userId: {
      type: String
    }
  },

  mounted() {
    if (this.userId) {
      this.data.userId = this.userId;
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Data
   * -------------------------------------------------------------------
   */
  data() {
    return {
      pending: false,
      menu: false,
      maxTitleLength: 120,
      maxSlugLength: 50,
      isEditSlug: false,
      editorConfig: config
    };
  },

  /**
   * -------------------------------------------------------------------
   *  Methods
   * -------------------------------------------------------------------
   */
  methods: {
    ...mapActions({
      saveTemp: 'temp/saveTempArticle',
      clearTemp: 'temp/clearTempArticle',
      create: 'article/create',
      update: 'article/update',
      delete: 'article/delete'
    }),

    slugify(slug) {
      const content = this.isEditSlug ? slug : this.data.title;
      if (slug && slug.length > this.maxSlugLength) {
        this.data.slug = generateSlug(content).substring(0, this.maxSlugLength);
      } else {
        this.data.slug = generateSlug(content);
      }
    },

    onDataChanged() {
      if (this.mode === 'create' && this.saveTemp) {
        this.saveTemp(this.data);
      }
    },

    toggleEditSlug() {
      this.isEditSlug = !this.isEditSlug;
    },

    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.pending = true;
        this.mode === 'create' ? this.createArticle() : this.updateArticle();
      }
    },

    async createArticle() {
      try {
        let article = await this.create(this.data);
        this.pending = false;
        this.clearTemp();
        this.$router.push({
          name: 'admin-articles'
        });
      } catch (error) {
        console.log(error);
      }
    },

    async updateArticle() {
      try {
        let article = await this.update({
          id: this.id,
          data: this.data
        });
        console.log(article);
        this.pending = false;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteArticle() {
      try {
        await this.delete(this.id);
      } catch (error) {
        console.log(error);
      }
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Computed
   * -------------------------------------------------------------------
   */
  computed: {
    showSubmit() {
      if (this.mode === 'edit') {
        return true;
      } else {
        return this.data.title !== '';
      }
    },
    url() {
      return this.data.title ? `/articles/${this.data.slug}` : null;
    },
    slug: {
      get() {
        return this.data.slug;
      },
      set(newSlug) {
        return newSlug;
      }
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Validations
   * -------------------------------------------------------------------
   */
  validations: {
    data: {
      title: {
        required
      },
      slug: {
        required
      },
      summary: {
        required
      }
    }
  }
};
