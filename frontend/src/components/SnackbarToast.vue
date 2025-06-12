<template>
  <v-snackbar
    v-model="model"
    :timeout="5000"
    :color="color"
  >
    {{ message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Define props
const props = defineProps({
  modelValue: Boolean,
  color: String,
  message: String,
});

// Emit event for v-model updates
const emit = defineEmits(['update:modelValue']);
const model = defineModel<boolean | undefined>()
</script>
