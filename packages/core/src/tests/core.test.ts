import assert from 'node:assert/strict'
import test from 'node:test'

import { ERROR_NAME } from '../errors'

test('do not fail because there are no tests', () => {
  assert.strictEqual(ERROR_NAME, 'tokra.error')
})
