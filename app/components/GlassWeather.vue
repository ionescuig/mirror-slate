<script setup lang="ts">
import { weatherIcon } from '#shared/utils/weather'

defineProps<{
  ok: boolean
  weather: { status: string, place?: string, today?: { mark: string, high: number, feels?: number | null }, days?: { name: string, mark: string, high: number }[] }
}>()
</script>

<template>
  <section aria-label="Weather" class="text-right max-[801px]:text-center">
    <GlassEmpty v-if="weather.status === 'no-place'" title="No place set." />
    <GlassEmpty v-else-if="!ok" title="Weather unavailable." />
    <template v-else>
      <p v-if="weather.place" class="m-0 mb-1 text-[1rem] text-[#8b939a]">{{ weather.place }}</p>
      <div class="flex items-center justify-end gap-3 max-[801px]:justify-center short:gap-2">
        <UIcon :name="weatherIcon(weather.today?.mark)" class="size-12 shrink-0 text-[#f3f5f6] short:size-8" aria-hidden="true" />
        <div>
          <p class="m-0 text-[2rem] leading-tight font-medium tracking-tight short:text-[1.75rem]">{{ weather.today?.high }}°</p>
          <p class="m-0 text-[1.25rem] text-[#8b939a] short:text-[1.125rem]">{{ weather.today?.mark }}</p>
          <p v-if="weather.today?.feels != null" class="m-0 text-[0.875rem] text-[#8b939a]">Feels like {{ weather.today.feels }}°</p>
        </div>
      </div>
      <div class="mt-4 flex justify-end gap-3 max-[801px]:flex-col max-[801px]:items-center short:mt-2 short:gap-2">
        <div v-for="day in weather.days" :key="day.name" class="flex min-w-10 flex-col items-center text-[0.875rem] leading-tight text-[#8b939a]">
          <span>{{ day.name }}</span>
          <UIcon :name="weatherIcon(day.mark)" class="my-0.5 size-4" aria-hidden="true" />
          <span>{{ day.mark }}</span>
          <span>{{ day.high }}°</span>
        </div>
      </div>
    </template>
  </section>
</template>
