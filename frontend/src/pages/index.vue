<template>
  <v-container class="px-4" fluid>
    <div class="d-flex justify-end">
      <ButtonView
        class="mb-4"
        prepend-icon="mdi-plus"
        :primary="true"
        title="Add"
        @click="showAddDialog = true"
      />
    </div>

    <WorkerorderTable
      :headers="headers"
      :workorders="workorders"
      :itemFields="itemFields"
      :getColor="getColor"
      :matched-item="matchedItem"
      :get-status-color="getStatusColor"
      @remove-workorder="handleRemoveWorkorder"
    />

    <AddWorkorderDialog
      v-model="showAddDialog"
      :itemFields="itemFields"
      :getMinRequired="getMinRequired"
      :validateField="validateField"
      @save="handleSaveWorkorder"

    />

    <SnackbarToast
      v-model="showErrorAlert"
      :color="toastColor"
      :message="errorMessage"
    />
  </v-container>
</template>

<script setup lang="ts">
//

import { ref } from 'vue';
import ButtonView from '@/components/common/Button/ButtonView.vue';
import AddWorkorderDialog from '@/components/WorkorderCreation.vue';
import SnackbarToast from '@/components/SnackbarToast.vue';
import WorkerorderTable from "@/components/WorkorderTable.vue"
import { createWorkorder, deleteWorkorder, getWorkorders, type Workorder } from '@/services/sqlite';
import type { DataTableHeader } from 'vuetify';
import {useAppStore} from "@/stores/app.ts";

const headers: DataTableHeader[] = [
  { title: 'Work Order #', value: 'WorkorderNumber', width: '6%' },
  { title: 'Syringe', value: 'Syringe', width: '13%', align: 'center' },
  { title: 'Gauze Pad', value: 'Gauze', width: '13%', align: 'center' },
  { title: 'Dover - Drainage Bag', value: 'Dover', width: '13%', align: 'center' },
  { title: 'Coloplast - Drainage Bag', value: 'Coloplast', width: '13%', align: 'center' },
  { title: 'Sterile Pad', value: 'Pad', width: '13%', align: 'center' },
  { title: 'Status', value: 'status', width: '8%', align: 'center' },
  { title: 'Assignee', value: 'assignee', align: 'center' },
  { title: 'Actions', value: 'actions', width: 40, align: 'center' },
];

// State
const {workorders, isModalShow: showAddDialog} = storeToRefs(useAppStore())

// New workorder object structure
const newWorkorder = ref({
  assignee: '',
  Items: [
    { name: 'Syringe', Found: 0, Required: 0 },
    { name: 'Gauze', Found: 0, Required: 0 },
    { name: 'Dover', Found: 0, Required: 0 },
    { name: 'Coloplast', Found: 0, Required: 0 },
    { name: 'Pad', Found: 0, Required: 0 },
  ],
});

// Snackbar State
const showErrorAlert = ref(false);
const errorMessage = ref('');
const toastColor = ref('red');

const itemFields = [
  { name: 'Syringe', label: 'Syringe', minRequired: 10 },
  { name: 'Gauze', label: 'Gauze Pad', minRequired: 3 },
  { name: 'Dover', label: 'Dover Drainage Bag', minRequired: 3 },
  { name: 'Coloplast', label: 'Coloplast Drainage Bag', minRequired: 3 },
  { name: 'Pad', label: 'Sterile Pad', minRequired: 3 },
];

// Utility Functions
function getMinRequired(name: string): number {
  const field = itemFields.find(field => field.name === name);
  return field ? field.minRequired : 0;
}

function validateField(name: string, value: number): boolean {
  const minRequired = getMinRequired(name);
  return value <= minRequired && value >= 0;
}

// Fetch workorders from database
async function fetchWorkorders() {
  try {
    const fetchedWorkorders = await getWorkorders();
    console.log(fetchedWorkorders);
    workorders.value = fetchedWorkorders;
  } catch (error) {
    showToastMessage('Failed to fetch workorders!', 'error');
    console.error(error);
  }
}

function matchedItem(field:any, item:any) {
  const matchingItem = item.Items.find((i:any) => i.name === field.toLowerCase());
  return matchingItem || { Found: 0, Required: 0 };
}


// Get Color Based on Found vs Required
function getColor (found: number = 0, required: number = 0): string {
  if(found === 0 && required === 0) return 'grey'
  if (found > required) return 'var(--main-action-error)';
  if (found === required) return 'var(--main-action-good)';
  if (found < required) return 'var(--main-primary)';
  return 'grey';
}

function getStatusColor(status: string): string {
  // Color logic for chips
  switch (status.toLowerCase()) {
    case 'pending':
      return 'grey'; // Pending status as grey
    case 'in progress':
      return 'var(--main-primary)'; // In-progress as secondary color
    case 'completed':
      return 'var(--main-action-good)'; // Completed as primary green
    default:
      return 'var(--main-action-error)'; // Fallback for undefined statuses
  }
}

function arrayToObject<T>(array: T[], keyField: keyof T, valueField: keyof T): Record<string, any> {
  return array.reduce((obj, item) => {
    obj[item[keyField] as string] = item[valueField];
    return obj;
  }, {} as Record<string, any>);
}

// Handle saving workorder
async function handleSaveWorkorder(newWorkorderData: any) {
  try {
    const formattedItems = itemFields.map((field, index) => ({
      name: field.name.toLowerCase(),
      qty: Number(newWorkorderData[field.name]) ?? 0,
    }));
    console.log(arrayToObject(formattedItems, 'name', 'qty'));
    const response = await createWorkorder(arrayToObject(formattedItems, 'name', 'qty'));
    await fetchWorkorders();
    showAddDialog.value = false;
    showToastMessage('Workorder created successfully!', 'success');
  } catch (error) {
    showToastMessage('Failed to create workorder.', 'error');
    console.error(error);
  }
}

// Handle removing a workorder
async function handleRemoveWorkorder(workorderId: number) {
  try {
    console.log("Worker ID: ", workorderId)
    await deleteWorkorder(workorderId);
    await fetchWorkorders();
    showToastMessage('Workorder removed successfully!', 'success');
  } catch (error) {
    showToastMessage('Failed to remove workorder.', 'error');
    console.error(error);
  }
}

// Snackbar Toast for User Feedback
function showToastMessage(message: string, type: 'success' | 'error' | 'info') {
  errorMessage.value = message;
  toastColor.value =
    type === 'success' ? 'green' : type === 'error' ? 'red' : 'blue';
  showErrorAlert.value = true;
}


// Automatically Refresh Data Every 5 Seconds
let pollingInterval: number | undefined;

onMounted(() => {
  fetchWorkorders();
  // pollingInterval = setInterval(fetchWorkorders, 1000); // Fetch every 5 seconds
});

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval); // Clear interval when component unmounted
});
</script>
