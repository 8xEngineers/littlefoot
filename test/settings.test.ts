import { expect, test } from 'vitest'
import tinyfoot from '../src/tinyfoot'

test('allows getting default values', () => {
  const instance = tinyfoot()
  expect(instance.getSetting('anchorParentSelector')).toBe('sup')
})

test('allows getting provided values', () => {
  const instance = tinyfoot({ scope: 'main' })
  expect(instance.getSetting('scope')).toBe('main')
})

test('allows setting values', () => {
  const lf = tinyfoot()
  lf.updateSetting('scope', 'article')
  expect(lf.getSetting('scope')).toBe('article')
})
