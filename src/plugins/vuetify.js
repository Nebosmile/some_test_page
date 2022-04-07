import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#00BDD3',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#CB3D40',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          },
        },
      },
});
