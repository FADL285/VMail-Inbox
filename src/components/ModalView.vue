<script setup>
import { defineEmits } from "vue";

defineEmits(["close"]);
</script>

<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
