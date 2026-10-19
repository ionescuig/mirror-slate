import { chooseList } from './tasks.ts'

export function buildState(selectedId, extras = {}) {
  const lists = Array.isArray(extras.lists) ? extras.lists : []
  const selected = chooseList(lists, selectedId)
  return {
    lists,
    selectedListId: selected?.id ?? null,
    tasks: selected && Array.isArray(extras.tasks) ? extras.tasks : [],
    done: selected && Array.isArray(extras.done) ? extras.done : [],
    events: Array.isArray(extras.events) ? extras.events : [],
    weather: extras.weather ?? { status: 'no-place' },
  }
}
