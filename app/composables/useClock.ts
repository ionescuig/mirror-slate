import { formatClock, formatDate } from '#shared/utils/clock'

export function useClock() {
  const clock = ref('')
  const dateLine = ref('')

  function tick() {
    const now = new Date()
    clock.value = formatClock(now)
    dateLine.value = formatDate(now)
  }

  function arm() {
    tick()
    const now = new Date()
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()
    setTimeout(arm, Math.max(delay, 1000))
  }

  onMounted(arm)

  return { clock, dateLine }
}
