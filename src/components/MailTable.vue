<script setup>
import { ref, computed } from "vue";
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
  sortedEmails.value.filter((mail) => !mail.archived)
);

// Methods
const updateMail = async (mail) => {
  await axios.put(`${import.meta.env.VITE_API_URL}/emails/${mail.id}`, mail);
};
const archiveEmail = async (mail) => {
  mail.archived = true;
  await updateMail(mail);
};
const markEmailAsRead = async (mail) => {
  mail.read = true;
  await updateMail(mail);
};
const openEmail = async (mail) => {
  openedEmail.value = mail;
  await markEmailAsRead(mail);
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
        <td><button @click.stop="archiveEmail(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>

  <ModalView v-if="openedEmail" @close="openedEmail = null">
    <MailView :email="openedEmail" />
  </ModalView>
</template>

<style scoped></style>
