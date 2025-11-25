import { createApp } from 'vue'
import App from './App.vue'
import { h } from 'vue'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'


//Font sources
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

/* optional italic styles */
import '@fontsource/roboto/100-italic.css'
import '@fontsource/roboto/300-italic.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/500-italic.css'
import '@fontsource/roboto/700-italic.css'
import '@fontsource/roboto/900-italic.css'

//Importing custom clubhub logo svg icon
import chLogoComponent from './components/icon.vue'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    aliases:{
        chLogo: chLogoComponent,
    },
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
})

createApp(App).use(vuetify).mount('#app')
