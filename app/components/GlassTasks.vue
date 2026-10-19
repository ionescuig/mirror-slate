<script setup lang="ts">
const props = defineProps<{
  lists: { id: string, title: string }[]
  items: { label: string, value: string }[]
  tasks: { id: string, title: string, due: string | null }[]
  done: { id: string, title: string, due: string | null }[]
}>()
const listId = defineModel<string>({ required: true })
const emit = defineEmits<{ toggle: [id: string, done: boolean] }>()

const { pane: openPane, edge: openEdge, refresh: refreshOpen } = useEdgePane(() => props.tasks)
const { pane: donePane, edge: doneEdge, refresh: refreshDone } = useEdgePane(() => props.done)
</script>

<template>
  <section aria-label="Tasks" class="flex h-[30rem] min-h-0 flex-col short:h-full short:overflow-hidden">
    <GlassRegion title="Tasks">
      <USelect
        v-if="lists.length"
        v-model="listId"
        :items="items"
        aria-label="Task list"
        class="min-h-12 w-auto min-w-64 max-w-[calc(100%-5.5rem)]"
        color="neutral"
        size="lg"
        variant="outline"
        :ui="{
          base: 'rounded-[8px] bg-[#1c2024] text-[#f3f5f6] ring-[#2a3036]',
          content: 'rounded-[8px] bg-[#1c2024] text-[#f3f5f6] shadow-none ring-[#2a3036]',
          item: 'text-[#f3f5f6] data-highlighted:text-[#f3f5f6]',
        }"
      />
    </GlassRegion>
    <GlassEmpty v-if="!lists.length" title="No lists." />
    <template v-else>
      <div ref="openPane" class="edge-pane min-h-0 flex-[2] overflow-y-auto" @scroll="refreshOpen">
        <GlassEmpty v-if="!tasks.length" title="Nothing due." />
        <div
          v-for="(task, index) in tasks"
          :key="task.id"
          data-row
          class="flex items-center gap-1.5 py-0.5"
          :class="edgeClass(openEdge, index)"
        >
          <UButton
            icon="i-lucide-square"
            :aria-label="`Mark ${task.title} done`"
            :aria-pressed="false"
            class="size-8 shrink-0 justify-center p-0 text-[#8b939a]"
            color="neutral"
            variant="ghost"
            @click="emit('toggle', task.id, false)"
          />
          <p class="m-0 text-[1rem] text-[#f3f5f6]">
            <span>{{ task.title }}</span>
            <span v-if="task.due" class="ml-2 text-[0.875rem] text-[#8b939a]">{{ task.due }}</span>
          </p>
        </div>
      </div>
      <div ref="donePane" class="edge-pane min-h-0 flex-1 overflow-y-auto border-t border-[#2a3036]" @scroll="refreshDone">
        <p class="m-0 pt-2 text-[0.875rem] tracking-[0.16em] text-[#5c656c] uppercase">Done</p>
        <div
          v-for="(task, index) in done"
          :key="task.id"
          data-row
          class="flex items-center gap-1.5 py-0.5"
          :class="edgeClass(doneEdge, index)"
        >
          <UButton
            icon="i-lucide-square-check"
            :aria-label="`Mark ${task.title} open`"
            :aria-pressed="true"
            class="size-8 shrink-0 justify-center p-0 text-[#5c656c]"
            color="neutral"
            variant="ghost"
            @click="emit('toggle', task.id, true)"
          />
          <p class="m-0 text-[1rem] text-[#5c656c] line-through">{{ task.title }}</p>
        </div>
      </div>
    </template>
  </section>
</template>
