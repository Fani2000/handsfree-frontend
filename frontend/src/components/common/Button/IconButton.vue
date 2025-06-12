<template>
  <v-btn
    class="d-flex flex-column"
    :class="error ? 'btnError' : 'btnHover'"
    :color="color"
    :size="size"
    :style="`padding: 0px ${padding}px`"
  >
    <icon-view :color="iconColor" :name="icon" :size="iconSize" />
    <p style="font-size: 8px; color: #828c94">{{ label }}</p>
  </v-btn>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  import IconView from '../Icon/IconView.vue'

  defineProps({
    padding: Number,
    label: {
      default: '',
    },
    size: {
      default: 34,
      type: Number,
    },
    error: {
      default: false,
      type: Boolean,
    },
    iconSize: {
      default: '20',
      type: String,
    },
    color: {
      type: String,
      default: '#ECECEC',
    },
    iconColor: {
      type: String,
      default: '#FFFFFF',
    },
    icon: String,
  })
</script>

<style>
.btnHover,
.btnError {
  height: 32px !important;
  width: 34px !important;
}

.btnHover .v-btn__content,
.btnError .v-btn__content {
  display: flex;
  flex-direction: column;
}

/* .btnHover:hover .bg-primary,
.btnHover:focus .bg-primary{
  background-color: var(--main-primary-hover) !important;
} */

.btnHover:hover {
  background-color: var(--main-primary-hover);
}
.btnHover:hover span i,
.btnHover:hover span p {
  color: var(--main-ui-white) !important;
}

button.v-btn.v-theme--light.bg-primary.v-btn--density-default.v-btn--variant-flat.d-flex.flex-column.btnHover:hover {
    background-color:  var(--main-primary-hover) !important;
}

button.v-btn.v-theme--light.bg-primary.v-btn--density-default.v-btn--variant-flat.d-flex.flex-column.btnHover:focus{
    background-color:  var(--main-primary-hover) !important;
}

.btnError:hover {
  background-color: var(--main-action-error) !important;
}

.btnError span i,
.btnError span p {
  color: var(--main-action-error) !important;
}
.btnError:hover span i,
.btnError:hover span p {
  color: var(--main-ui-white) !important;
}
</style>
