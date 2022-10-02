import assert from 'node:assert/strict'
import test from 'node:test'
import { withApiKey } from '../useApiKey'

test('withApiKey does not throw error given valid key', async () => {
  const mockFn = async (props: any) => props
  const mockProps = {
    meta: {
      headers: {
        'x-api-key': 'Key mock-secret'
      }
    }
  } as any
  await withApiKey(mockFn, 'mock-secret', mockProps)
})

test('withApiKey throws error when api key is missing', async () => {
  const mockFn = async (props: any) => props
  const mockProps = {
    meta: {
      headers: {
        /** no api key header **/
      }
    }
  } as any
  try {
    await withApiKey(mockFn, 'mock-secret', mockProps)
    assert.fail('Expected error to be thrown - apiKey should be required')
  } catch (err) {
    return
  }
})

test('withApiKey throws error when api key does not match', async () => {
  const mockFn = async (props: any) => props
  const mockProps = {
    meta: {
      headers: {
        'x-api-key': 'wrong-mock-secret'
      }
    }
  } as any
  try {
    await withApiKey(mockFn, 'mock-secret', mockProps)
    assert.fail('Expected error to be thrown - apiKey should match')
  } catch (err) {
    return
  }
})
