<template>
  <v-data-table
    :headers="headers"
    :hide-default-footer="true"
    item-value="WorkorderNumber"
    :items="workorders"
  >
    <!-- Dynamic Item Fields -->
    <template
      v-for="field in itemFields"
      :key="field.name"
      #[`item.${field.name}`]="{ item }"
    >
      <WorkorderItemField
        :field="field.name"
        :item="item"
        :matchedItem="matchedItem"
        :getColor="getColor"
      />
    </template>

    <!-- Status -->
    <template #item.status="{ item }">
      <v-chip
        :color="getStatusColor(item.status)"
        size="small"
        dark
      >
        {{ item.status }}
      </v-chip>
    </template>

    <!-- Assignee -->
    <template #item.assignee="{ item }">
      {{ item.assignee }}
    </template>

    <!-- Actions -->
    <template #item.actions="{ item }">
      <IconButton
        :error="true"
        icon="delete-forever-outline"
        icon-color="var(--main-ui-grey)"
        class="mx-2"
        :size="24"
        variant="outlined"
        @click="$emit('remove-workorder', item.WorkorderNumber)"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import WorkorderItemField from "@/components/FieldMatchingDisplay.vue";

defineProps({
  headers: {
    type: Array<any>,
    required: true,
  },
  workorders: {
    type: Array<any>,
    required: true,
  },
  itemFields: {
    type: Array<any>,
    required: true,
  },
  getColor: {
    type: Function,
    required: true,
  },
  getStatusColor: {
    type: Function,
    required: true,
  },
  matchedItem: {
    type: Function,
    required: true,
  },
});
</script>
