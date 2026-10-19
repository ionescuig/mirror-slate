<script setup lang="ts">
const { listId, lists, tasks, done, events, weather, weatherOk, listItems, refresh, toggleTask } = await useGlass()
</script>

<template>
  <div class="relative flex min-h-dvh flex-col bg-black px-6 pt-16 pb-6 text-[#f3f5f6] short:h-dvh short:overflow-hidden short:px-4 short:pt-3 short:pb-3">
    <GlassFullscreen :refresh="refresh" />
    <div class="grid shrink-0 items-start gap-8 min-[801px]:grid-cols-[1fr_auto_1fr] short:gap-3">
      <GlassClock class="min-[801px]:col-start-2" />
      <GlassWeather class="min-[801px]:col-start-3 min-[801px]:justify-self-end" :ok="weatherOk" :weather="weather" />
    </div>
    <div class="mt-8 grid min-h-0 flex-1 gap-8 min-[801px]:grid-cols-[4fr_4fr_4fr] min-[801px]:gap-0 short:mt-3 short:grid-cols-[5fr_2fr_5fr] short:overflow-hidden short:grid-rows-[minmax(0,1fr)]">
      <GlassCalendar class="min-[801px]:col-start-1" :events="events" />
      <GlassTasks class="min-[801px]:col-start-3" v-model="listId" :done="done" :items="listItems" :lists="lists" :tasks="tasks" @toggle="toggleTask" />
    </div>
  </div>
</template>
