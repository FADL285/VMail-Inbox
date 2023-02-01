<script setup>
import { ref } from "vue";
import useFormatDate from "./utils/useFormatDate";

import { emails } from "/db.json";
const mails = ref(emails);
</script>

<template>
  <main>
    <h1>VMail Inbox</h1>
    <table class="mail-table">
      <tbody>
        <tr
          v-for="mail in mails"
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
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped></style>
