import assert from 'node:assert'
import test from 'node:test'
import type { Props } from 'tokra'
import * as yup from 'yup'
import { validate, withShapeValidation } from '../useValidation'

const model = yup.object({
  id: yup.number().required(),
  name: yup.string().required()
})

test('validate throws when missing required attribute', async () => {
  try {
    await validate(model, {
      id: 22
      // no name
    })
    assert.fail('Expected error to be thrown')
  } catch (err) {}
})

test('validate returns validated model', async () => {
  const result = await validate(model, {
    id: 22,
    name: 'ray'
  })
  assert.equal(result.id, 22)
})

test('validate casts valid model', async () => {
  const result = await validate(model, {
    id: '22',
    name: 'ray'
  })
  assert.equal(result.id, 22)
})

test('withShapeValidation applies model attributes to args', async () => {
  const mockHandlerFn = (props: any) => props.args
  const getArgs = (props: any) => props.meta.query
  const props = {
    meta: {
      query: {
        id: 22,
        name: 'mock-nmame'
      }
    }
  } as any as Props
  const args = await withShapeValidation(mockHandlerFn, model, getArgs, props)
  assert.equal(args.id, props.req.query.id)
  assert.equal(args.name, props.req.query.name)
})
