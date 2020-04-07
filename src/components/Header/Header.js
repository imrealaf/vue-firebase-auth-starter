import { mapState, mapActions, mapGetters } from 'vuex';
import ClickOutside from 'vue-click-outside';

import { APP_TITLE, LOGGED_OUT_ROUTE } from '@/constants';

export default {
  /**
   * -------------------------------------------------------------------
   *  Directives
   * -------------------------------------------------------------------
   */
  directives: {
    ClickOutside
  },

  /**
   * -------------------------------------------------------------------
   *  Props
   * -------------------------------------------------------------------
   */
  props: {
    /**
     * title
     * @description the title of the app
     */
    title: {
      type: String,
      default: APP_TITLE
    },

    /**
     * color
     * @description background color of the header
     */
    color: {
      type: String
    },

    /**
     * isTransparent
     * @description if header is transparent or not
     */
    isTransparent: {
      type: Boolean,
      default: false
    },

    /**
     * flat
     * @description make header flat with no shadow
     */
    flat: {
      type: Boolean,
      default: false
    },

    /**
     * clipped
     * @description make the header clipped
     */
    clipped: {
      type: Boolean,
      default: false
    },

    /**
     * fixed
     * @description make the header fixed position
     */
    fixed: {
      type: Boolean,
      default: true
    },

    /**
     * navItems
     * @description array of nav items
     */
    navItems: Array
  },

  /**
   * -------------------------------------------------------------------
   *  Data
   * -------------------------------------------------------------------
   */
  data() {
    return { isMobileMenu: this.isMobile() };
  },

  /**
   * -------------------------------------------------------------------
   *  Computed
   * -------------------------------------------------------------------
   */
  computed: {
    ...mapState({
      user: (state) => state.user.data,
      profile: (state) => state.user.profile
    }),

    /**
     * menuIsOpen
     * @description the actual background to display after logic
     * @returns {Boolean}
     */
    menuIsOpen: {
      get() {
        return this.$store.state.menu.open;
      },
      set(newValue) {
        return newValue;
      }
    },

    /**
     * menuIsMini
     * @description the actual background to display after logic
     * @returns {Boolean}
     */
    menuIsMini: {
      get() {
        return this.$store.state.menu.isMini;
      },
      set(newValue) {
        return newValue;
      }
    },

    /**
     * bgColor
     * @description the actual background to display after logic
     * @returns {String}
     */
    bgColor() {
      return this.isTransparent ? 'transparent' : this.color;
    },

    /**
     * isFlat
     * @description the final comparison of if the header should be flat
     * @returns {Boolean}
     */
    isFlat() {
      return this.isTransparent ? true : this.flat;
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Methods
   * -------------------------------------------------------------------
   */
  methods: {
    ...mapActions({
      toggleMenu: 'menu/toggleMenu',
      toggleMiniMenu: 'menu/toggleMiniMenu',
      logout: 'user/logout',
      menuIsClosed: 'menu/menuIsClosed'
    }),

    isMobile() {
      return window.innerWidth <= 1024;
    },

    onClickOutside() {
      if (this.isMobileMenu) {
        this.menuIsClosed();
      }
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Watch
   * -------------------------------------------------------------------
   */
  watch: {
    user() {
      this.$router.push({
        name: LOGGED_OUT_ROUTE
      });
    },
    isMobileMenu() {
      if (this.isMobileMenu && this.menuIsMini) {
        this.toggleMiniMenu();
      }
    }
  },

  /**
   * -------------------------------------------------------------------
   *  Mounted
   * -------------------------------------------------------------------
   */
  mounted() {
    window.addEventListener('resize', () => {
      this.isMobileMenu = this.isMobile();
    });
  }
};
