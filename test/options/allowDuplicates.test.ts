import { expect, test } from 'vitest'
import tinyfoot from '../../src/tinyfoot'
import { getAllButtons, setDocumentBody } from '../helper'

test('create one button per footnote reference', () => {
  setDocumentBody('default.html')
  tinyfoot({ allowDuplicates: true })
  expect(getAllButtons()).toHaveLength(4)
})

test('ignore duplicate footnote references', () => {
  setDocumentBody('default.html')
  tinyfoot({ allowDuplicates: false })
  expect(getAllButtons()).toHaveLength(3)
})

test('create all buttons when footnotes are in different containers', () => {
  setDocumentBody('multiple.html')
  tinyfoot({ allowDuplicates: false })
  expect(getAllButtons()).toHaveLength(5)
})
