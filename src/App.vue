<script setup>
import { ref, computed } from "vue";
import useFormatDate from "./utils/useFormatDate";

import { emails } from "/db.json";
const mails = ref(emails);
const sortedMails = computed(() =>
  [...mails.value].sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
);

const unArchivedMails = computed(() =>
  sortedMails.value.filter((mail) => !mail.archived)
);
</script>

<template>
  <main>
    <h1>VMail Inbox</h1>
    <table class="mail-table">
      <tbody>
        <tr
          v-for="mail in unArchivedMails"
          :key="mail.id"
          :class="['clickable', mail.read ? 'read' : '']"
          @click="mail.read = true"
        >
          <td>
            <input type="checkbox" />
          </td>
          <td>
            {{ mail.from }}
          </td>
          <td>
            <p>
              <strong>{{ mail.subject }}</strong> - {{ mail.body }}
            </p>
          </td>
          <td class="date">{{ useFormatDate(new Date(mail.sentAt)) }}</td>
          <td><button @click="mail.archived = true">Archive</button></td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped></style>
