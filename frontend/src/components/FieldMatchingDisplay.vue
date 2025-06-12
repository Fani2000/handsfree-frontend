<template>
  <div
    :style="{
      color: getColor(
        matchedItem(field, item)?.Found ?? 0,
        matchedItem(field, item)?.Required ?? 0
      ),
      fontWeight: 'bold',
    }"
  >
    {{
      matchedItem(field, item)?.Found ?? 0
    }} /
    {{
      matchedItem(field, item)?.Required ?? 0
    }}
  </div>
</template>

<script setup lang="ts">
/**
 * Props allow this component to dynamically render fields
 * based on item values passed to it.
 */
defineProps({
  field: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  getColor: {
    type: Function,
    required: true,
  },
  matchedItem: {
    type: Function,
    required: true,
  },
});
</script>
