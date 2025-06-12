<template>
  <v-btn
    :append-icon="appendIcon"
    :color="btnColorClass"
    density="compact"
    :loading="loading"
    min-width="80"
    :prepend-icon="prependIcon"
    style="
      height: 32px !important;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 12px; /* 85.714% */
      letter-spacing: 0.28px;
      background-color: white;
    "
    variant="outlined"
  >
    <!-- min-width="110px"
    height="40px" -->
    <!-- style="text-transform: capitalize; font-style: normal; font-weight: 400" -->
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
    ? 'var(--main-primary)'
    : secondary.value
      ? 'var(--main-secondary)'
      : error.value
        ? 'var(--main-action-error)'
        : warning.value
          ? 'var(--main-action-warning)'
          : 'var(--main-ui-grey)'
</script>
