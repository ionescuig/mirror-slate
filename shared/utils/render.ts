type ListRow = { id?: string, title?: string }
type TaskRow = { id?: string, title?: string, due?: string | null }
type EventRow = { title?: string, time?: string, day?: string, clock?: string | null, detail?: string | null }
type DayRow = { name?: string, mark?: string, high?: number, feels?: number | null }
type WeatherRow = { status?: string, place?: string, today?: DayRow, days?: DayRow[] }
type GlassState = {
  lists?: ListRow[]
  selectedListId?: string | null
  tasks?: TaskRow[]
  done?: TaskRow[]
  events?: EventRow[]
  weather?: WeatherRow
}

export function stripSecrets(state: GlassState | null | undefined) {
  return {
    lists: publicLists(state?.lists),
    selectedListId: typeof state?.selectedListId === 'string' ? state.selectedListId : null,
    tasks: publicTasks(state?.tasks),
    done: publicTasks(state?.done),
    events: publicEvents(state?.events),
    weather: publicWeather(state?.weather),
  }
}

function publicLists(lists: ListRow[] | undefined) {
  if (!Array.isArray(lists)) return []
  return lists
    .filter((list) => typeof list?.id === 'string' && typeof list?.title === 'string')
    .map((list) => ({ id: list.id as string, title: list.title as string }))
}

function publicTasks(tasks: TaskRow[] | undefined) {
  if (!Array.isArray(tasks)) return []
  return tasks
    filter((task) => typeof task?.id === 'string' && typeof task?.title === 'string')
    .map((task) => ({ id: task.id as string, title: task.title as string, due: typeof task.due === 'string' ? task.due : null }))
}

function publicEvents(events: EventRow[] | undefined) {
  if (!Array.isArray(events)) return []
  return events
    .filter((event) => typeof event?.title === 'string' && typeof event?.time === 'string' && typeof event?.day === 'string')
    .map((event) => ({
      title: event.title as string,
      time: event.time as string,
      day: event.day as string,
      clock: typeof event.clock === 'string' ? event.clock : null,
      detail: typeof event.detail === 'string' && event.detail.length > 0 ? event.detail : null,
    }))
}

function publicWeather(weather: WeatherRow | undefined) {
  if (!weather || weather.status === 'no-place') return { status: 'no-place' as const }
  if (weather.status !== 'ok' || !isDay(weather.today) || !Array.isArray(weather.days) || weather.days.length !== 5) {
    return { status: 'failed' as const }
  }
  if (weather.days.some((day) => !isDay(day))) return { status: 'failed' as const }
  return {
    status: 'ok' as const,
    place: typeof weather.place === 'string' ? weather.place : '',
    today: {
      name: weather.today!.name as string,
      mark: weather.today!.mark as string,
      high: weather.today!.high as number,
      feels: Number.isInteger(weather.today!.feels) ? weather.today!.feels as number : null,
    },
    days: weather.days.map((day) => ({ name: day.name as string, mark: day.mark as string, high: day.high as number })),
  }
}

function isDay(day: DayRow | undefined): day is { name: string, mark: string, high: number } {
  return typeof day?.name === 'string' && typeof day?.mark === 'string' && Number.isInteger(day?.high)
}
