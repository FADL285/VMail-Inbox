<script setup>
import { computed, ref } from "vue";
import axios from "axios";
import useFormatDate from "@/composables/useFormatDate";
import MailView from "./MailView.vue";
import ModalView from "./ModalView.vue";

const emails = ref([]);
emails.value = await axios
  .get(import.meta.env.VITE_API_URL + "/emails")
  .then((res) => res.data);
const openedEmail = ref(null);

// Computed properties
const sortedEmails = computed(() =>
  [...emails.value].sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
);
const unArchivedEmails = computed(() =>
  sortedEmails.value.filter((email) => !email.archived)
);
const isLastEmail = computed(() => {
  const index = unArchivedEmails.value.findIndex(
    (e) => e.id === openedEmail.value?.id
  );
  return index === unArchivedEmails.value.length - 1;
});
const isFirstEmail = computed(() => {
  const index = unArchivedEmails.value.findIndex(
    (e) => e.id === openedEmail.value?.id
  );
  return index === 0;
});

// Methods
const updateEmail = async (email) => {
  await axios.put(`${import.meta.env.VITE_API_URL}/emails/${email.id}`, email);
};
const markAsArchived = async (email) => {
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
    const index = unArchivedEmails.value.findIndex(
      (e) => e.id === openedEmail.value.id
    );
    openedEmail.value = unArchivedEmails.value.at(index + changeIndex);
  }
  if (closeModal) openedEmail.value = null;
};
</script>

<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unArchivedEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
        @click="openEmail(email)"
      >
        <td>
          <input type="checkbox" />
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
        <td><button @click.stop="markAsArchived(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>

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
