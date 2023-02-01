<script setup>
import useEmailSelection from "@/composables/useEmailSelection.js";
import { computed } from "vue";

const {
  emails: selectedEmails,
  clear: clearSelectedEmails,
  addMultiple,
  markAsRead,
  markAsUnread,
  archive,
} = useEmailSelection();

const props = defineProps({
  emails: {
    type: Array,
    required: true,
  },
});

const allEmailsSelected = computed(() => {
  return selectedEmails.size === props.emails.length;
});
const someEmailSelected = computed(() => {
  return selectedEmails.size > 0 && !allEmailsSelected.value;
});

const bulkSelect = () => {
  if (allEmailsSelected.value) {
    clearSelectedEmails();
  } else {
    addMultiple(props.emails);
  }
};
</script>

<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[someEmailSelected && 'partial-check']"
        @click="bulkSelect"
      />
    </span>
    <span class="buttons">
      <button @click="markAsRead">Mark as Read</button>
      <button @click="markAsUnread">Mark as Unread</button>
      <button @click="archive">Archive</button>
    </span>
  </div>
</template>
