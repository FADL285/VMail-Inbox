<script setup>
import { marked } from "marked";
import useFormatDate from "@/composables/useFormatDate";

defineProps({
  email: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="email-display">
    <h2 class="mb-0">
      <span class="mr-2">Subject:</span>
      <strong>{{ email.subject }}</strong>
    </h2>
    <p>
      <em>
        From: {{ email.from }} on
        {{ useFormatDate(new Date(email.sentAt)) }}</em
      >
    </p>
    <div class="mt-8" v-html="marked(email.body)"></div>
  </div>
</template>

<style scoped></style>
