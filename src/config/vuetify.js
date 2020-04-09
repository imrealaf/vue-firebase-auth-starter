import colors from 'vuetify/es5/util/colors';

const primary = colors.red.accent3;

export default {
  customVariables: ['~/styles/variables.scss'],
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: primary,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,

        // Custom props
        background: '#181818',
        toolbar: primary,
        drawer: '#000',
        list: '#111',
        card: '#222',
        dialog: '',
        input_border: '#000'
      }
    },
    options: {
      customProperties: true
    }
  }
};
