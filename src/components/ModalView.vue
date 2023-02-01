<script setup>
import useKeyDown from "@/composables/useKeyDown";

const emit = defineEmits(["close"]);
useKeyDown([
  {
    key: "Escape",
    fn: () => emit("close"),
  },
]);
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
