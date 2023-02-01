<script setup>
import { onErrorCaptured } from "vue";
import MailTable from "@/components/MailTable.vue";

onErrorCaptured((err) => {
  console.log("Error");
  console.log(err);
});
</script>

<template>
  <main>
    <h1>VMail Inbox</h1>

    <Suspense>
      <template #default>
        <MailTable />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </main>
</template>

<style scoped></style>
