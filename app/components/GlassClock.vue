<script setup lang="ts">
const { clock, dateLine } = useClock()
</script>

<template>
  <div class="text-center">
    <p class="m-0 text-[4.5rem] leading-none font-medium tracking-tight max-[801px]:text-[3.25rem] short:text-[4rem]">{{ clock }}</p>
    <p class="mt-3 mb-0 text-[1.125rem] leading-snug text-[#8b939a] short:mt-1">{{ dateLine }}</p>
  </div>
</template>
