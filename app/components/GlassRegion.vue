<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="mb-1 flex min-h-12 items-center gap-4 border-b border-[#2a3036] pb-2">
    <h2 class="m-0 shrink-0 text-[1.125rem] font-normal tracking-[0.16em] text-[#5c656c] uppercase">{{ title }}</h2>
    <div class="ml-auto flex min-w-0 justify-end">
      <slot />
    </div>
  </div>
</template>
