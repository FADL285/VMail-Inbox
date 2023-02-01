<script setup>
import MailTable from "@/components/MailTable.vue";
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
      <template #error>
        <div>Error :(</div>
      </template>
    </Suspense>
  </main>
</template>

<style scoped></style>
