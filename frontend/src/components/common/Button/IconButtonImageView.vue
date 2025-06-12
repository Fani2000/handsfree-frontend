<template>
  <v-btn class="btnHover" :color="color" :size="size" :style="`padding: 0px ${padding}px`">
    <v-img :height="iconSize" :src="icon" :width="iconSize" />
  </v-btn>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  defineProps({
    padding: Number,
    size: {
      default: 32,
      type: Number,
    },
    color: {
      type: String,
    },
    iconColor: {
      type: String,
    },
    icon: String,
    iconSize: {
      type: String,
      default: '20px',
    },
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

.btnHover:hover .bg-primary,
.btnHover:focus .bg-primary{
  background-color: var(--main-primary-hover) !important;
}

.btnHover:hover {
  background-color: var(--main-primary-hover) !important;
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

</style>
