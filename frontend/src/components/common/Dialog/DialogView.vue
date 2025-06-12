<template>
  <v-dialog v-model:model-value="model" width="60vw">
    <template #default="{ isActive }">
      <dialog-layout
        :has-action="hasAction"
        :has-breadcrumb="hasBreadcrumb"
        :has-close="hasClose"
        :has-pagination="hasPagination"
        :is-small-modal="isSmallModal"
        :sub-title="subTitle"
        :title="title"
        @close-modal="() => (isActive.value = false)"
        @refresh="handleRefresh"
      >
        <template #content>
          <slot name="content" />
        </template>
      </dialog-layout>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue'
  import DialogLayout from '@/layouts/dialog-layout.vue'


  const emits = defineEmits(['refresh'])

  defineProps({
    title: String,
    subTitle: String,
    hasAction: Boolean,
    hasPagination: {
      default: true,
      type: Boolean,
    },
    hasBreadcrumb: {
      default: true,
      type: Boolean,
    },
    isSmallModal: {
      default: false,
      type: Boolean,
    },
    hasClose: {
      default: false,
      type: Boolean,
    },
  })
  // const emits = defineEmits(['update:modelValue'])
  const model = defineModel<boolean | undefined>()

  const handleRefresh = () => {
    emits('refresh')
  }
</script>

<style>
.v-dialog > .v-overlay__content > .v-card > .v-card-item {
  padding: 4px 0px !important;
}
</style>
