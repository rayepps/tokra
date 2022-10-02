import { expect, test } from '@jest/globals'
import { withLambda } from '../useLambda'

test('useLambda stop gap', () => {
  expect(withLambda).not.toBeNull()
})
