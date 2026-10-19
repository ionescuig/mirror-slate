<script setup lang="ts">
const props = defineProps<{ refresh: () => Promise<void> }>()
const { label, toggle } = useFullscreen()
const busy = ref(false)

async function reload() {
  if (busy.value) return
  busy.value = true
  try {
    await props.refresh()
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="absolute top-3 left-6 flex items-center">
    <UButton
      :icon="label === 'Exit' ? 'i-lucide-minimize' : 'i-lucide-maximize'"
      :aria-label="label"
      class="size-12 justify-center p-0 text-[#f3f5f6]"
      :ui="{ leadingIcon: 'size-6' }"
      color="neutral"
      variant="link"
      @click="toggle"
    />
    <UButton
      icon="i-lucide-refresh-cw"
      aria-label="Refresh"
      class="size-12 justify-center p-0 text-[#f3f5f6]"
      :ui="{ leadingIcon: 'size-6' }"
      color="neutral"
      variant="link"
      :disabled="busy"
      @click="reload"
    />
  </div>
</template>
