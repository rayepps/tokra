import { test } from '@jest/globals'
import { withApiKey } from '../useApiKey'

test('withApiKey does not throw error given valid key', async () => {
  const mockFn = async (props: any) => props
  const mockProps = {
    req: {
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
    req: {
      headers: {
        /** no api key header **/
      }
    }
  } as any
  try {
    await withApiKey(mockFn, 'mock-secret', mockProps)
  } catch (err) {
    return
  }
  throw new Error('Expected error to be thrown - apiKey should be required')
})

test('withApiKey throws error when api key does not match', async () => {
  const mockFn = async (props: any) => props
  const mockProps = {
    req: {
      headers: {
        'x-api-key': 'wrong-mock-secret'
      }
    }
  } as any
  try {
    await withApiKey(mockFn, 'mock-secret', mockProps)
  } catch (err) {
    return
  }
  throw new Error('Expected error to be thrown - apiKey should match')
})
