import { throttle } from '@pacote/throttle'
import { UseCases, FootnoteAction } from '../use-cases'

const FRAME = 16
const SELECTOR_BUTTON = '[data-footnote-button]'
const SELECTOR_FOOTNOTE = '[data-footnote-id]'
const SELECTOR_POPOVER = '[data-footnote-popover]'

const closestTarget = (event: Event, selector: string) =>
  (event.target as HTMLElement).closest<HTMLElement>(selector)

const getFootnoteId = (element: HTMLElement | null) =>
  element?.dataset.footnoteId

const touchHandler =
  (action: FootnoteAction, dismissAll: () => void) => (event: Event) => {
    const element = closestTarget(event, SELECTOR_BUTTON)
    const id = getFootnoteId(element)
    if (id) {
      action(id)
    } else if (!closestTarget(event, SELECTOR_POPOVER)) {
      dismissAll()
    }
  }

const hoverHandler = (action: FootnoteAction) => (event: Event) => {
  event.preventDefault()
  const element = closestTarget(event, SELECTOR_FOOTNOTE)
  const id = getFootnoteId(element)
  if (id) {
    action(id)
  }
}

const escapeHandler = (fn: () => void) => (event: KeyboardEvent) => {
  if (event.keyCode === 27 || event.key === 'Escape' || event.key === 'Esc') {
    fn()
  }
}

const onDocument = document.addEventListener
const onWindow = window.addEventListener

const delegate = (
  type: string,
  selector: string,
  listener: EventListener,
  options?: AddEventListenerOptions,
) => {
  const handler = (event: Event) => {
    const target = event.target as Element | null
    if (target?.closest(selector)) {
      listener.call(target, event)
    }
  }
  onDocument(type, handler, options)
}

export function addListeners(useCases: UseCases): () => void {
  const controller = new AbortController()
  const { signal } = controller
  const toggleOnTouch = touchHandler(useCases.toggle, useCases.documentTouch)
  const dismissOnEscape = escapeHandler(useCases.dismissAll)
  const throttledReposition = throttle(useCases.repositionAll, FRAME)
  const throttledResize = throttle(useCases.resizeAll, FRAME)
  const showOnHover = hoverHandler(useCases.hover)
  const hideOnHover = hoverHandler(useCases.unhover)

  onDocument('touchend', toggleOnTouch, { signal })
  onDocument('click', toggleOnTouch, { signal })
  onDocument('keyup', dismissOnEscape, { signal })
  onDocument('gestureend', throttledReposition, { signal })
  onWindow('scroll', throttledReposition, { signal })
  onWindow('resize', throttledResize, { signal })
  delegate('mouseover', SELECTOR_FOOTNOTE, showOnHover, { signal })
  delegate('mouseout', SELECTOR_FOOTNOTE, hideOnHover, { signal })

  return () => {
    controller.abort()
  }
}
