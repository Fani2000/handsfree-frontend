<template>
  <v-layout>
    <v-card
      class="d-flex flex-column px-0 pa-0"
      style="overflow: hidden; height: 60%; width: 50vw"
    >
      <template #title>
        <div class="d-flex flex-column" :class=" isSmallModal ? 'ml-5' : ''" style="flex: 1">
          <div
            class="d-flex justify-space-between align-center pr-0 py-1"
            style="height: 40px !important"
          >
            <div class="heading-4" style="font-size: 18px !important">{{ title }}</div>
          </div>

        </div>
      </template>

      <div class="pl-4 pr-4" style="align-self: start; width: 100%; height: 96%">
        <slot name="content" />
      </div>
    </v-card>
  </v-layout>
</template>
<script setup lang="ts">
  // import BreadcrumbView from '@/components/common/Breadcrumb/BreadcrumbView.vue'
  import { useAppStore } from '@/stores/app'
  import { storeToRefs } from 'pinia'
  import { defineEmits, defineProps } from 'vue'

  defineProps({
    title: String,
    subTitle: String,
    hasPagination: {
      type: Boolean,
      default: false,
    },
    hasAction: {
      type: Boolean,
      default: false,
    },
    hasClose: {
      type: Boolean,
      default: true,
    },
    hasBreadcrumb: {
      type: Boolean,
      default: true,
    },
    isSmallModal: {
      type: Boolean,
      default: false,
    },
  })


  const { isModalShow } = storeToRefs(useAppStore())

  const emits = defineEmits(['close', 'refresh'])

  const handleCloseModal = () => {
    if (!isModalShow.value)
    {
      emits('close')
    }
  }

</script>
