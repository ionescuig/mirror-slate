export function edgeClass(edge: { first: number, last: number }, index: number) {
  if (index === edge.first || index === edge.last) return 'opacity-50'
  return ''
}

export function useEdgePane(source: () => unknown) {
  const pane = ref<HTMLElement | null>(null)
  const edge = ref({ first: -1, last: -1 })

  function refresh() {
    const node = pane.value
    if (!node) return
    const rows = [...node.querySelectorAll<HTMLElement>('[data-row]')]
    const box = node.getBoundingClientRect()
    const slack = 8
    let firstVisible = -1
    let lastVisible = -1
    let hiddenAbove = false
    let hiddenBelow = false
    rows.forEach((row, index) => {
      const rect = row.getBoundingClientRect()
      if (rect.bottom <= box.top + slack) {
        hiddenAbove = true
        return
      }
      if (rect.top >= box.bottom - slack) {
        hiddenBelow = true
        return
      }
      if (firstVisible < 0) firstVisible = index
      lastVisible = index
      if (rect.top < box.top - slack) hiddenAbove = true
      if (rect.bottom > box.bottom + slack) hiddenBelow = true
    })
    edge.value = {
      first: hiddenAbove ? firstVisible : -1,
      last: hiddenBelow ? lastVisible : -1,
    }
  }

  let observer: ResizeObserver | undefined
  watch(pane, (node) => {
    observer?.disconnect()
    observer = undefined
    if (!node) return
    refresh()
    observer = new ResizeObserver(() => refresh())
    observer.observe(node)
  })
  onUnmounted(() => observer?.disconnect())
  watch(source, () => nextTick(refresh))

  return { pane, edge, refresh }
}
