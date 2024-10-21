import type { Adapter } from '../use-cases'
import { type FootnoteElements, footnoteActions } from './footnote'
import { bindScrollHandler } from './scroll'

export const CLASS_CONTENT = 'tinyfoot__content'
export const CLASS_WRAPPER = 'tinyfoot__wrapper'

export type HTMLAdapterSettings = Readonly<{
  allowDuplicates: boolean
  anchorParentSelector: string
  anchorPattern: RegExp
  buttonTemplate: string
  contentTemplate: string
  footnoteSelector: string
  numberResetSelector: string
  scope: string
}>

type TemplateValues = Readonly<{
  number: number
  id: string
  content: string
  reference: string
}>

const CLASS_PRINT_ONLY = 'tinyfoot--print'

const setAllPrintOnly = (...elements: readonly Element[]) =>
  elements.forEach((e) => e.classList.add(CLASS_PRINT_ONLY))

function queryAll<E extends Element>(
  parent: ParentNode,
  selector: string,
): readonly E[] {
  return Array.from(parent.querySelectorAll<E>(selector))
}

function getByClassName<E extends Element>(element: E, className: string): E {
  return (
    element.querySelector<E>('.' + className) ||
    (element.firstElementChild as E | null) ||
    element
  )
}

function createElementFromHTML(html: string): HTMLElement {
  const container = document.createElement('div')
  container.innerHTML = html
  const element = container.firstElementChild as HTMLElement
  element.remove()
  return element
}

function isDefined<T>(value?: T): value is T {
  return value !== undefined
}

function findFootnoteLinks(
  document: Document,
  pattern: RegExp,
  scope: string,
): readonly HTMLAnchorElement[] {
  return queryAll<HTMLAnchorElement>(document, scope + ' a[href*="#"]').filter(
    (link) => (link.href + link.rel).match(pattern),
  )
}

function findReference<E extends Element>(
  document: Document,
  allowDuplicates: boolean,
  anchorParentSelector: string,
  footnoteSelector: string,
) {
  const processed: E[] = []
  return (link: HTMLAnchorElement): [string, Element, E] | undefined => {
    const fragment = link.href.split('#')[1]
    if (!fragment) return

    const body = queryAll<E>(document, '#' + window.CSS.escape(fragment))
      .find((footnote) => allowDuplicates || !processed.includes(footnote))
      ?.closest<E>(footnoteSelector)
    if (!body) return

    processed.push(body)
    const reference = link.closest<E>(anchorParentSelector) || link
    return [reference.id || link.id, reference, body]
  }
}

function recursiveHideFootnoteContainer(element: Element): void {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const container = element.parentElement!
  const visibleElements = queryAll(
    container,
    ':scope > :not(.' + CLASS_PRINT_ONLY + ')',
  )
  const visibleSeparators = visibleElements.filter((el) => el.tagName === 'HR')

  if (visibleElements.length === visibleSeparators.length) {
    setAllPrintOnly(...visibleSeparators.concat(container))
    recursiveHideFootnoteContainer(container)
  }
}

function recursiveUnmount(element: Element, stopElement: Element) {
  const parent = element.parentElement
  element.remove()
  if (
    parent &&
    parent !== stopElement &&
    !parent.innerHTML.replace(/(\[\]|&nbsp;|\s)/g, '')
  ) {
    recursiveUnmount(parent, stopElement)
  }
}

function prepareTemplateData<E extends Element>(
  [id, reference, body]: [string, E, E],
  index: number,
): [E, E, TemplateValues] {
  const content = createElementFromHTML(body.outerHTML)
  const backlinkSelector = '[href$="#' + id + '"]'
  queryAll<E>(content, backlinkSelector).forEach((bl) =>
    recursiveUnmount(bl, content),
  )
  const html = content.innerHTML.trim()

  return [
    reference,
    body,
    {
      id: String(index + 1),
      number: index + 1,
      reference: 'lf-' + id,
      content: html.startsWith('<') ? html : '<p>' + html + '</p>',
    },
  ]
}

function resetNumbers<E extends Element>(resetSelector: string) {
  let number = 0
  let previousParent: E | null = null
  return ([reference, body, values]: [E, E, TemplateValues]): [
    E,
    E,
    TemplateValues,
  ] => {
    const parent = reference.closest<E>(resetSelector)
    number = previousParent === parent ? number + 1 : 1
    previousParent = parent
    return [reference, body, { ...values, number }]
  }
}

function interpolate(template: string) {
  return (replacement: TemplateValues) =>
    template.replace(/<%=?\s*(\w+?)\s*%>/g, (_, key: keyof TemplateValues) =>
      String(replacement[key] ?? ''),
    )
}

function createElements<E extends Element>(
  buttonTemplate: string,
  popoverTemplate: string,
) {
  const renderButton = interpolate(buttonTemplate)
  const renderPopover = interpolate(popoverTemplate)

  return ([reference, values]: [E, TemplateValues]): FootnoteElements => {
    const id = values.id

    const host = createElementFromHTML(
      '<span class="tinyfoot">' + renderButton(values) + '</span>',
    )

    const button = host.firstElementChild as HTMLElement
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute('highlight-toggled', 'false')
    button.dataset.footnoteButton = ''
    button.dataset.footnoteId = id

    const popover = createElementFromHTML(renderPopover(values))
    popover.dataset.footnotePopover = ''
    popover.dataset.footnoteId = id

    const wrapper = getByClassName(popover, CLASS_WRAPPER)
    const content = getByClassName(popover, CLASS_CONTENT)
    bindScrollHandler(content, popover)

    reference.insertAdjacentElement('beforebegin', host)

    return { id, button, host, popover, content, wrapper }
  }
}

export function setup({
  allowDuplicates,
  anchorParentSelector,
  anchorPattern,
  buttonTemplate,
  contentTemplate,
  footnoteSelector,
  numberResetSelector,
  scope,
}: HTMLAdapterSettings): Adapter<HTMLElement> {
  // Editing the following code to segment into different function calls instead of chaining 
  // Helps in debugging and understanding the code
  const footnoteLinks = findFootnoteLinks(document, anchorPattern, scope);
  const reference = findReference(document, allowDuplicates, anchorParentSelector, footnoteSelector);
  // Filtering the footnoteLinks to remove undefined values
  const filteredFootnoteLinks = footnoteLinks.map(reference).filter(isDefined);
  // Prepare the template data for the footnotes
  const templateData = filteredFootnoteLinks.map(prepareTemplateData);

  // Reset the numbers of the footnotes
  const resetNumbersFn = numberResetSelector ? resetNumbers(numberResetSelector) : (i: [Element, Element, TemplateValues]) => i;
  const numberedTemplateData = templateData.map(resetNumbersFn);

  // Process the numbered template data
  const processedTemplateData = numberedTemplateData.map(([reference, body, values]) => {
    setAllPrintOnly(reference, body);
    recursiveHideFootnoteContainer(body);
    return [reference, values];
  });
  const createElementsWithTemplates = createElements(buttonTemplate, contentTemplate);
  const createdElements = processedTemplateData.map(([reference, values]) => {
    if (reference instanceof Element && values !== undefined && 
        'number' in values && 'id' in values && 'content' in values && 'reference' in values) {
      return createElementsWithTemplates([reference, values]);
    }
    return null;
  }).filter((element): element is FootnoteElements => element !== null);
  const footnotes = createdElements.map(footnoteActions);
  
  return {
    footnotes,

    unmount() {
      footnotes.forEach((footnote) => footnote.destroy())
      queryAll(document, '.' + CLASS_PRINT_ONLY).forEach((element) =>
        element.classList.remove(CLASS_PRINT_ONLY),
      )
    },
  }
}
