import { fireEvent } from '@testing-library/dom'
import { beforeEach, expect, test } from 'vitest'
import tinyfoot from '../src/tinyfoot'
import {
  getAllActiveButtons,
  getAllButtons,
  getButton,
  getPopover,
  setDocumentBody,
} from './helper'

beforeEach(() => {
  setDocumentBody('default.html')
})

test('creates one button and one host per footnote call', () => {
  tinyfoot()
  expect(document.querySelectorAll('.tinyfoot')).toHaveLength(4)
  expect(getAllButtons()).toHaveLength(4)
})

test('processes each called footnote', () => {
  tinyfoot()
  expect(document.querySelectorAll('.footnotes')).toHaveLength(1)
})

test('hides all footnotes', () => {
  tinyfoot()
  expect(
    document.querySelectorAll('.footnotes.tinyfoot--print'),
  ).toHaveLength(1)
  expect(document.querySelectorAll('hr.tinyfoot--print')).toHaveLength(1)
  expect(document.querySelectorAll('li.tinyfoot--print')).toHaveLength(3)
})

test('starts with no active footnotes', () => {
  tinyfoot()
  expect(getAllActiveButtons()).toHaveLength(0)
})

test('sets ARIA attributes on button', () => {
  tinyfoot()
  const button = getButton('1')
  expect(button).toHaveAttribute('aria-expanded', 'false')
})

test('sets up footnotes with a URL before the fragment', () => {
  setDocumentBody('filename.html')
  tinyfoot()
  expect(document.querySelectorAll('.tinyfoot')).toHaveLength(1)
  expect(getAllButtons()).toHaveLength(1)
})

test('strips backlink and its enclosing tags from the footnote body', () => {
  setDocumentBody('backlink.html')
  tinyfoot({ activateDelay: 1 })
  fireEvent.click(getButton('1'))
  expect(getPopover('1').querySelector('sup')).toBeNull()
})

test('strips backlink and its enclosing tags when they contain whitespace', () => {
  setDocumentBody('backlink.html')
  tinyfoot({ activateDelay: 1 })
  fireEvent.click(getButton('2'))
  expect(getPopover('2').querySelector('sup')).toBeNull()
})

test('preserves empty tags and square brackets elsewhere in the footnote body', () => {
  setDocumentBody('backlink.html')
  tinyfoot({ activateDelay: 1 })
  fireEvent.click(getButton('1'))
  const content = getPopover('1').querySelector('.tinyfoot__content')
  expect(content?.querySelector('hr')).not.toBeNull()
  expect(content).toContainHTML(
    'This footnote has a backlink wrapped in [] and an element.',
  )
})

test('wraps bare footnote body in a paragraph tag', () => {
  setDocumentBody('barebody.html')
  tinyfoot({ activateDelay: 1 })
  fireEvent.click(getButton('1'))
  expect(getPopover('1').querySelector('p')).toContainHTML(
    'The original footnote body is bare.',
  )
})

test('footnote button accessibility', async () => {
  tinyfoot()
  const button = getButton('1')

  expect(button).toHaveAccessibleName()
  expect(button).toHaveAccessibleDescription()
})

test('handles empty footnotes reasonably', () => {
  setDocumentBody('empty.html')
  tinyfoot()
  expect(document.querySelectorAll('.tinyfoot')).toHaveLength(3)
  expect(getAllButtons()).toHaveLength(3)
})
