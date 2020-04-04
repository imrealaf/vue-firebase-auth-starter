import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  /**
   * -------------------------------------------------------------------
   *  Mixins
   * -------------------------------------------------------------------
   */
  mixins: [validationMixin],

  /**
   * -------------------------------------------------------------------
   *  Data
   * -------------------------------------------------------------------
   */
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },

  /**
   * -------------------------------------------------------------------
   *  Methods
   * -------------------------------------------------------------------
   */
  methods: {
    /**
     * login
     * @description log user in by dispatching login action
     */
    async login() {
      this.$v.$touch();

      // If form is valid ..
      if (!this.$v.$invalid) {
        this.error = '';

        // Success ..
        try {
          await this.$store.dispatch('user/login', {
            email: this.email,
            password: this.password
          });

          // Failed ..
        } catch (error) {
          console.log(error);
          this.error = error.message;
        }
      }
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Watch
   * -------------------------------------------------------------------
   */
  watch: {
    /**
     * user
     * @description watch user property to handle redirect on auth change if firebase is slow
     */
    user(to, from) {
      this.$router.push('/admin/dashboard');
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Computed
   * -------------------------------------------------------------------
   */
  computed: {
    ...mapState({
      user: (state) => state.user.data
    }),
    emailRules() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('Email address is required');
      !this.$v.email.email && errors.push('Email must be valid');
      return errors;
    },
    passwordRules() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required');
      return errors;
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
