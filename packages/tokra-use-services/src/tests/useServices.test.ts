import assert from 'node:assert/strict'
import test from 'node:test'
import { withServices } from '../useServices'

test('withServices passess all services', async () => {
  const services = {
    octokit: () => 'o-service',
    redis: () => 'r-service'
  }
  const mockFunc = (props: any) => props.services
  const result = await withServices(mockFunc, services, { services: {} } as any)
  assert.equal(result.octokit, 'o-service')
  assert.equal(result.redis, 'r-service')
})

test('withServices passess existing services', async () => {
  const services = {
    octokit: () => 'o-service',
    redis: () => 'r-service'
  }
  const existingServices = {
    database: 'd-service'
  }
  const mockFunc = (props: any) => props.services
  const result = await withServices(mockFunc, services, {
    services: existingServices
  } as any)
  assert.equal(result.octokit, 'o-service')
  assert.equal(result.redis, 'r-service')
  assert.equal(result.database, 'd-service')
})
