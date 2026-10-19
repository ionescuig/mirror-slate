<script setup lang="ts">
import { groupEvents } from '#shared/utils/calendar'

const props = defineProps<{ events: { title: string, time: string, day: string, clock: string | null, detail: string | null }[] }>()
const groups = computed(() => groupEvents(props.events))
type CalendarRow = { kind: 'day', day: string, key: string } | { kind: 'event', key: string, title: string, clock: string | null, detail: string | null }
const rows = computed(() => {
  const list: CalendarRow[] = []
  for (const group of groups.value) {
    list.push({ kind: 'day', day: group.day, key: `day-${group.day}` })
    for (const event of group.items) {
      list.push({
        kind: 'event',
        key: `${group.day}-${event.time}-${event.title}`,
        title: event.title,
        clock: event.clock,
        detail: event.detail,
      })
    }
  }
  return list
})
const { pane, edge, refresh } = useEdgePane(() => rows.value)
</script>

<template>
  <section aria-label="Calendar" class="flex h-[30rem] min-h-0 flex-col short:h-full short:overflow-hidden">
    <GlassRegion title="Calendar" />
    <GlassEmpty v-if="!events.length" title="Nothing scheduled." />
    <div v-else ref="pane" class="edge-pane min-h-0 flex-1 overflow-y-auto" @scroll="refresh">
      <template v-for="(row, index) in rows" :key="row.key">
        <p
          v-if="row.kind === 'day'"
          data-row
          class="m-0 pt-2 text-[0.875rem] tracking-[0.08em] text-[#8b939a] uppercase"
          :class="edgeClass(edge, index)"
        >{{ row.day }}</p>
        <div v-else data-row class="flex items-start gap-2 py-0.5 pl-3" :class="edgeClass(edge, index)">
          <UIcon name="i-lucide-calendar" class="mt-1 size-4 shrink-0 text-[#8b939a]" aria-hidden="true" />
          <span class="mt-0.5 w-16 shrink-0 text-[0.875rem] leading-5 text-[#8b939a]">{{ row.clock ?? 'All day' }}</span>
          <p class="m-0 min-w-0 text-[1rem] leading-5 text-[#f3f5f6]">
            <span>{{ row.title }}</span>
            <span v-if="row.detail" class="mt-0.5 block text-[0.875rem] text-[#8b939a]">{{ row.detail }}</span>
          </p>
        </div>
      </template>
    </div>
  </section>
</template>
