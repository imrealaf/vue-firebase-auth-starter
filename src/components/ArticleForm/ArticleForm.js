import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import { generateSlug } from '@/utils';
import moment from 'moment';

import { auth } from '@/services/firebase';

export default {
  /**
   * -------------------------------------------------------------------
   *  Mixins
   * -------------------------------------------------------------------
   */
  mixins: [validationMixin],

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
        isPublished: false
      })
    },
    mode: {
      required: true,
      type: String,
      default: 'create'
    },
    user: {
      type: Object
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
      slugEdit: false
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
