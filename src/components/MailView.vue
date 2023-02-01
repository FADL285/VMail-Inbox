<script setup>
import { marked } from "marked";
import useFormatDate from "@/composables/useFormatDate";
import useKeyDown from "@/composables/useKeyDown.js";

defineProps({
  email: {
    type: Object,
    required: true,
  },
  isLastEmail: {
    type: Boolean,
    required: true,
  },
  isFirstEmail: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["changeEmail"]);

const toggleRead = () => {
  emit("changeEmail", { toggleRead: true, save: true });
};
const toggleArchive = () => {
  emit("changeEmail", { toggleArchive: true, save: true, closeModal: true });
};
const goNewer = () => {
  emit("changeEmail", { changeIndex: -1 });
};
const goOlder = () => {
  emit("changeEmail", { changeIndex: 1 });
};
const goNewerAndArchive = () => {
  emit("changeEmail", { changeIndex: -1, toggleArchive: true, save: true });
};
const goOlderAndArchive = () => {
  emit("changeEmail", { changeIndex: 1, toggleArchive: true, save: true });
};

useKeyDown([
  { key: "r", fn: toggleRead },
  { key: "e", fn: toggleArchive },
  { key: "k", fn: goNewer },
  { key: "ArrowLeft", fn: goNewer },
  { key: "j", fn: goOlder },
  { key: "ArrowRight", fn: goOlder },
  { key: "[", fn: goNewerAndArchive },
  { key: "]", fn: goOlderAndArchive },
]);
</script>

<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? "Move to Inbox" : "Archive" }} <small>(e)</small>
      </button>
      <button @click="toggleRead">
        {{ email.read ? "Mark as Unread" : "Mark as Read" }} <small>(r)</small>
      </button>
      <button @click="goNewer" :disabled="isFirstEmail">
        Newer <small>k</small>
      </button>
      <button @click="goOlder" :disabled="isLastEmail">
        Older <small>j</small>
      </button>
    </div>
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
