<template>
  <v-btn
    :append-icon="appendIcon"
    :class="btnColorClass"
    density="compact"
    :loading="loading"
    :prepend-icon="prependIcon"
    style="
      height: 32px !important;
      font-size: 12px !important;
      font-style: normal;
      font-weight: 400;
      line-height: 12px;
      letter-spacing: 0.28px;
    "
    variant="flat"
  >
    {{ title }}
  </v-btn>
</template>
<script setup lang="ts">
  import { toRefs } from 'vue'
  import { defineProps } from 'vue'

  const props = defineProps({
    title: String,
    prependIcon: String,
    appendIcon: String,
    primary: Boolean,
    error: Boolean,
    warning: Boolean,
    secondary: Boolean,
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const { primary, secondary, error, warning } = toRefs(props)

  const btnColorClass = primary.value
    ? 'btn-primary'
    : secondary.value
      ? 'btn-secondary'
      : error.value
        ? 'btn-error'
        : warning.value
          ? 'btn-warning'
          : 'btn-grey'
</script>
