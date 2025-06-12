<template>
  <v-btn
    :append="appendIcon"
    :color="color"
    density="compact"
    min-width="80"
    :prepend-icon="prependIcon"
    style="height: 32px !important; font-size: 12px; font-weight: 300"
    variant="text"
  >
    {{ title }}
  </v-btn>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue'
  defineProps({
    title: String,
    prependIcon: String,
    appendIcon: String,
    color: String,
  })
</script>
