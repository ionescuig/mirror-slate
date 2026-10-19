const POLL_MS = 5 * 60 * 1000

type GlassList = { id: string, title: string }
type GlassTask = { id: string, title: string, due: string | null }
type GlassEvent = { title: string, time: string, day: string, clock: string | null, detail: string | null }
type GlassDay = { name: string, mark: string, high: number, feels?: number | null }
type GlassWeather = { status: string, place?: string, today?: GlassDay, days?: GlassDay[] }
type GlassPayload = {
  lists?: GlassList[]
  selectedListId?: string | null
  tasks?: GlassTask[]
  done?: GlassTask[]
  events?: GlassEvent[]
  weather?: GlassWeather
}

export async function useGlass() {
  const listId = ref('')
  const picked = ref(false)
  const glass = useFetch<GlassPayload>('/api/glass', {
    query: computed(() => (picked.value && listId.value ? { list: listId.value } : {})),
  })
  let poll: ReturnType<typeof setInterval> | undefined
  onMounted(() => {
    poll = setInterval(() => glass.refresh(), POLL_MS)
  })
  onUnmounted(() => clearInterval(poll))
  const { data } = glass

  const lists = computed(() => (Array.isArray(data.value?.lists) ? data.value.lists : []))
  const tasks = computed(() => (Array.isArray(data.value?.tasks) ? data.value.tasks : []))
  const done = computed(() => (Array.isArray(data.value?.done) ? data.value.done : []))
  const events = computed(() => (Array.isArray(data.value?.events) ? data.value.events : []))
  const weather = computed(() => data.value?.weather ?? { status: 'no-place' })
  const listItems = computed(() => lists.value.map((list) => ({ label: list.title, value: list.id })))
  const weatherOk = computed(() => weather.value.status === 'ok' && weather.value.today && Array.isArray(weather.value.days) && weather.value.days.length === 5)

  watch(listId, (id, previous) => {
    if (typeof previous === 'string' && previous !== '' && id !== previous) picked.value = true
  })

  watch(
    () => data.value?.selectedListId,
    (id) => {
      if (typeof id === 'string' && listId.value === '') listId.value = id
    },
    { immediate: true },
  )

  async function refresh() {
    await glass.refresh()
  }

  async function toggleTask(id: string, doneNow: boolean) {
    if (!listId.value || !id) return
    try {
      await $fetch('/api/task', { method: 'PATCH', body: { list: listId.value, id, done: !doneNow } })
    } catch {
      // The host refused the write. The reload shows the host list.
    }
    await refresh()
  }

  await glass
  return { listId, lists, tasks, done, events, weather, weatherOk, listItems, refresh, toggleTask }
}
