import { fireEvent } from '@testing-library/dom'
import { expect, test, vi } from 'vitest'
import tinyfoot from '../../src/tinyfoot'
import { getButton, getPopover, setDocumentBody } from '../helper'

test('setup with activateCallback', () => {
  setDocumentBody('single.html')
  const activateCallback = vi.fn()
  tinyfoot({ activateCallback })
  const button = getButton('1')

  fireEvent.click(button)

  const popover = getPopover('1')
  expect(activateCallback).toHaveBeenCalledTimes(1)
  expect(activateCallback).toHaveBeenCalledWith(popover, button)
})

test('activateCallback can be set after initialisation', () => {
  setDocumentBody('single.html')
  const activateCallback = vi.fn()
  const instance = tinyfoot()
  instance.updateSetting('activateCallback', activateCallback)
  const button = getButton('1')

  fireEvent.click(button)

  const popover = getPopover('1')
  expect(activateCallback).toHaveBeenCalledTimes(1)
  expect(activateCallback).toHaveBeenCalledWith(popover, button)
})
