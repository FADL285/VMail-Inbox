<script setup>
import { computed, ref } from "vue";
import axios from "axios";
import useFormatDate from "@/composables/useFormatDate";
import useEmailSelection from "@/composables/useEmailSelection";
import MailView from "./MailView.vue";
import ModalView from "./ModalView.vue";
import BulkActionsBar from "@/components/BulkActionsBar.vue";

// Constants
const INBOX_SCREEN = "inbox";
const ARCHIVE_SCREEN = "archive";

const currentScreen = ref(INBOX_SCREEN);
const emails = ref([]);
emails.value = await axios
  .get(import.meta.env.VITE_API_URL + "/emails")
  .then((res) => res.data);
const openedEmail = ref(null);

const {
  emails: selectedEmails,
  toggle: toggleSelectedEmails,
  clear: clearSelectedEmails,
} = useEmailSelection();

// Computed properties
const sortedEmails = computed(() =>
  [...emails.value].sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
);
const filteredEmails = computed(() =>
  sortedEmails.value.filter((email) =>
    currentScreen.value === INBOX_SCREEN ? !email.archived : email.archived
  )
);
const isLastEmail = computed(() => {
  const index = filteredEmails.value.findIndex(
    (e) => e.id === openedEmail.value?.id
  );
  return index === filteredEmails.value.length - 1;
});
const isFirstEmail = computed(() => {
  const index = filteredEmails.value.findIndex(
    (e) => e.id === openedEmail.value?.id
  );
  return index === 0;
});

// Methods
const changeScreen = (screen) => {
  openedEmail.value = null;
  clearSelectedEmails();
  currentScreen.value = screen;
};
const updateEmail = async (email) => {
  await axios.put(`${import.meta.env.VITE_API_URL}/emails/${email.id}`, email);
};
const toggleArchive = async (email) => {
  email.archived = !email.archived;
  await updateEmail(email);
};
const markEmailAsRead = async (email) => {
  email.read = true;
  await updateEmail(email);
};
const openEmail = async (email) => {
  openedEmail.value = email;
  await markEmailAsRead(email);
};
const changeEmail = async ({
  toggleRead,
  toggleArchive,
  save,
  closeModal,
  changeIndex,
}) => {
  if (toggleRead) openedEmail.value.read = !openedEmail.value.read;
  if (toggleArchive) openedEmail.value.archived = !openedEmail.value.archived;
  if (save) await updateEmail(openedEmail.value);
  if (changeIndex) {
    if (isFirstEmail.value && changeIndex === -1) return;
    if (isLastEmail.value && changeIndex === 1) return;
    const index = filteredEmails.value.findIndex(
      (e) => e.id === openedEmail.value.id
    );
    openedEmail.value = filteredEmails.value.at(index + changeIndex);
  }
  if (closeModal) openedEmail.value = null;
};
</script>

<template>
  <div>
    <button
      @click="changeScreen(INBOX_SCREEN)"
      :disabled="currentScreen === INBOX_SCREEN"
    >
      Inbox
    </button>
    <button
      @click="changeScreen(ARCHIVE_SCREEN)"
      :disabled="currentScreen === ARCHIVE_SCREEN"
    >
      Archive
    </button>
  </div>
  <BulkActionsBar
    :emails="filteredEmails"
    :isInbox="currentScreen === INBOX_SCREEN"
  />
  <table v-if="filteredEmails.length" class="mail-table">
    <tbody>
      <tr
        v-for="email in filteredEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
        @click="openEmail(email)"
      >
        <td>
          <input
            type="checkbox"
            @click.stop="toggleSelectedEmails(email)"
            :checked="selectedEmails.has(email)"
          />
        </td>
        <td>
          {{ email.from }}
        </td>
        <td>
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date">{{ useFormatDate(new Date(email.sentAt)) }}</td>
        <td>
          <button @click.stop="toggleArchive(email)">
            {{ currentScreen === INBOX_SCREEN ? "Archive" : "Move to Inbox" }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else class="text-xl">No emails to show</p>

  <ModalView v-if="openedEmail" @close="openedEmail = null">
    <MailView
      :email="openedEmail"
      :is-first-email="isFirstEmail"
      :is-last-email="isLastEmail"
      @change-email="changeEmail"
    />
  </ModalView>
</template>

<style scoped></style>
