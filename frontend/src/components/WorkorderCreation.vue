<template>
  <DialogView v-model="model" title="Create a Workorder">
    <template #content>
      <v-card class="pa-0 ma-0" elevation="0">
        <v-card-text class="pa-0 d-flex flex-column">
          <v-form ref="formRef" v-model="formValid" class="d-flex flex-column ga-4 pt-2">
            <!-- Dynamically Generate Text Fields for Each Item -->
            <template v-for="(field, index) in itemFields" :key="field.name">
              <v-text-field
                v-model="newWorkorder.Items[field.name]"
                :label="field.label"
                required
                :hint="`Minimum required for ${field.label} is ${field.minRequired}`"
                :rules="[v => validateField(field.name, v) || `Minimum required for ${field.label} is ${field.minRequired}`]"
                type="number"
                variant="outlined"
              />
              <span
                v-if="!validateField(field.name, newWorkorder.Items[field.name])"
                class="py-0 text-red text-capitalize text-caption"
              >
                {{ `Minimum required for ${field.label} is ${field.minRequired}` }}
              </span>
            </template>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <ButtonView
            class="mb-4"
            :primary="false"
            title="cancel"
            @click="model = false"
          />
          <ButtonView
            class="mb-4"
            :primary="true"
            title="Save"
            :disabled="!formValid"
            @click="saveWorkorder"
          />
        </v-card-actions>
      </v-card>
    </template>
  </DialogView>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import ButtonView from '@/components/common/Button/ButtonView.vue';

const model = defineModel<boolean | undefined>();

// Props
const props = defineProps({
  itemFields: {
    type: Array<any>, // Use array because itemFields is an array of objects.
    required: true,
  },
  getMinRequired: {
    type: Function,
    required: true,
  },
  validateField: {
    type: Function,
    required: true,
  },
});

// Emitted Events
const emits = defineEmits(['save']);

// Reactive State
const newWorkorder = reactive<any>({
  Items: {}, // Will dynamically fill based on itemFields
});

// Populate `newWorkorder.Items` based on the provided `itemFields`
onMounted(() => {
  props.itemFields.forEach((field: any) => {
    newWorkorder.Items[field.name] = 0; // Default all Required fields to 0
  });
});

// Tracks form validity
const formValid = ref(false);

// Save Workorder
function saveWorkorder() {
  emits('save', { ...newWorkorder.Items }); // Emit the updated work order
}
</script>
