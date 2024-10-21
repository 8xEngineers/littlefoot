import { fireEvent } from '@testing-library/dom'
import { expect, test } from 'vitest'
import tinyfoot from '../../src/tinyfoot'
import { getButton, getPopover, setDocumentBody } from '../helper'

test('hides original footnote anchor parent', () => {
  setDocumentBody('default.html')
  tinyfoot({ anchorParentSelector: 'sup' })
  expect(document.querySelectorAll('sup.tinyfoot--print')).toHaveLength(4)
})

test('uses reference ID from the link', () => {
  setDocumentBody('backlink.html')
  tinyfoot({ activateDelay: 1 })
  fireEvent.click(getButton('3'))
  expect(getPopover('3').querySelector('sup')).toBeNull()
})
