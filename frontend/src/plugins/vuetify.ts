// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const lightTheme = {
  colors: {
    primary: '#0072bc',
    secondary: '#070f26',
    accent: '#ffc400',
    background: '#e8e8e8',
    surface: '#ffffff',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    appBar: '#ffffff',
  },
}

const darkTheme = {
  colors: {
    primary: '#0072bc',
    secondary: '#070f26',
    accent: '#ff7a00',
    background: '#040914',
    surface: '#1f2a3a',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    appBar: '#070F26',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 2,
    },
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
})
