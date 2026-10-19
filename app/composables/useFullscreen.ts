export function useFullscreen() {
  const label = ref('Full screen')

  function onChange() {
    label.value = document.fullscreenElement ? 'Exit' : 'Full screen'
  }

  async function toggle() {
    const action = document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen()
    if (action && typeof action.catch === 'function') await action.catch(() => {})
  }

  onMounted(() => {
    onChange()
    document.addEventListener('fullscreenchange', onChange)
  })
  onUnmounted(() => document.removeEventListener('fullscreenchange', onChange))

  return { label, toggle }
}
