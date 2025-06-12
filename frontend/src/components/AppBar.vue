<template>
  <v-app-bar class="bg-appBar" elevation="0" style="border-bottom: 3px solid #0072bc !important; ">
    <template #prepend>
      <v-container class="d-flex ga-2 align-center">
        <router-link class="py-0" to="/">
          <v-img
            alt="Logo"
            cover
            :src="theme.global.current.value.dark ? LogoDark : LogoLight"
            :width="theme.global.current.value.dark ? 130 : 130"
          />
        </router-link>
        <hr style="height: 60px; width: 1px; color: white">
        <div
          class="d-flex flex-column justify-center align-center"
          style="font-size: 14px !important; gap: 1px; height: 100%"
        >
          <div class="pa-0 header-title ml-2" style="font-size: 16px !important;text-transform: capitalize">
            Handsfree Fulfillment
          </div>
        </div>
      </v-container>
    </template>
    <template #append>
      <v-avatar class="mx-4 cursor-pointer" color="primary" @click="toggleTheme">
        <v-icon
          color="white"
          :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        />
      </v-avatar>
    </template>
  </v-app-bar>
</template>
<script lang="ts" setup>
//
import LogoLight from '../assets/NttLightLogoResized.png';
import LogoDark from '../assets/NttDarkLogo.png';
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  // console.log("theme: ", theme.global.current.value)
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<style lang="scss" scoped>

</style>
