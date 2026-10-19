<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <UEmpty
    :title="title"
    variant="naked"
    :ui="{
      root: 'items-start justify-start gap-0 p-0 py-3',
      header: 'max-w-none items-start',
      title: 'text-left text-[1.25rem] font-normal text-[#8b939a]',
    }"
  />
</template>
