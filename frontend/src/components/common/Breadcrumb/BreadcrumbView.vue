<template>
  <v-breadcrumbs
    active-class="activeColor"
    active-color="var(--main-ui-grey)"
    color="var(--main-ui-grey)"
    density="compact"
    :items="items"
  >
    <template #divider>
      <v-icon icon="mdi-chevron-right" />
    </template>

    <template #title="{ item }">
      <div style="color: var(--main-ui-grey); font-size: 16px; line-height: 15px; font-weight: 500">
        {{ item.title }}
      </div>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts" setup>
  import { defineProps, type PropType } from 'vue'

  const props = defineProps({
    items: Array as PropType<any[]>,
  })
</script>

<style>
.v-btn__content {
  font-size: 14px !important;
}

.v-autocomplete__selection-text {
  font-size: 14px !important;
}

.v-breadcrumbs-divider {
  padding: 0px !important;
}

.activeColor {
  color: var(--main-ui-grey);
}
.v-breadcrumbs {
  padding: 16px 0px !important;
}
</style>
