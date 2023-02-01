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
  return selectedEmails.size === props.emails.length && props.emails.length > 0;
});
const someEmailSelected = computed(() => {
  return selectedEmails.size > 0 && !allEmailsSelected.value;
});
const allIsRead = computed(() =>
  [...selectedEmails].every((email) => email.read)
);
const allIsUnread = computed(() =>
  [...selectedEmails].every((email) => !email.read)
);

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
        :disabled="emails.length === 0"
        @click="bulkSelect"
      />
    </span>
    <span class="buttons">
      <button @click="markAsRead" :disabled="allIsRead">Mark as Read</button>
      <button @click="markAsUnread" :disabled="allIsUnread">
        Mark as Unread
      </button>
      <button @click="archive" :disabled="!selectedEmails.size">Archive</button>
    </span>
  </div>
</template>
