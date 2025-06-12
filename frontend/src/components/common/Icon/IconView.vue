<template>
  <v-icon :size="size">mdi-{{ name }}</v-icon>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue'
  defineProps({ name: String, size: { type: String, default: '20px' } })
</script>
