<script setup>
import { ref, computed } from "vue";
import useFormatDate from "@/utils/useFormatDate";

const mails = ref([]);

// mails.value = await axios.get("/api/mails").then((res) => res.data);
await new Promise((resolve) => setTimeout(resolve, 3000));

const sortedMails = computed(() =>
  [...mails.value].sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
);

const unArchivedMails = computed(() =>
  sortedMails.value.filter((mail) => !mail.archived)
);
</script>

<template>
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
</template>

<style scoped></style>
