import { screen } from '@testing-library/dom'
import { beforeEach, expect, test } from 'vitest'
import tinyfoot from '../src/tinyfoot'
import { setDocumentBody } from './helper'

beforeEach(() => {
  setDocumentBody('default.html')
})

test('unmount removes all buttons', () => {
  const instance = tinyfoot()
  instance.unmount()
  expect(document.querySelectorAll('.tinyfoot')).toHaveLength(0)
  expect(
    screen.queryByRole('button', { name: /See Footnote/ }),
  ).not.toBeInTheDocument()
})

test('unmount unhides all footnotes', () => {
  const instance = tinyfoot()
  instance.unmount()
  expect(document.querySelectorAll('.tinyfoot--print')).toHaveLength(0)
})
