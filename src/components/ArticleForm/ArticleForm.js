import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import moment from 'moment';

import { generateSlug } from '@/utils';
import Editor from '@tinymce/tinymce-vue';
import config from '@/config/tiny';
import { auth } from '@/services/firebase';

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
        title: '',
        slug: '',
        dateCreated: moment().format('YYYY-MM-DD'),
        dateUpdated: null,
        isPublished: false,
        content: ''
      })
    },
    mode: {
      required: true,
      type: String,
      default: 'create'
    },
    user: {
      type: Object
    },
    tempSave: {
      type: Function
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Data
   * -------------------------------------------------------------------
   */
  data() {
    return {
      menu: false,
      slugEdit: false,
      editorConfig: config
    };
  },

  /**
   * -------------------------------------------------------------------
   *  Methods
   * -------------------------------------------------------------------
   */
  methods: {
    slugify() {
      this.data.slug = generateSlug(this.data.title);
    },
    onBlur() {
      if (this.mode === 'create' && this.tempSave) {
        this.tempSave(this.data);
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
      return this.data.slug ? `/articles/${this.data.slug}` : null;
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Validations
   * -------------------------------------------------------------------
   */
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }
};
