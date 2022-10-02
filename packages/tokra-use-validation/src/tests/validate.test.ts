import { expect, test } from '@jest/globals'
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
    throw new Error('Expected validate to throw an error')
  } catch (err) {}
})

test('validate returns validated model', async () => {
  const result = await validate(model, {
    id: 22,
    name: 'ray'
  })
  expect(result.id).toBe(22)
})

test('validate casts valid model', async () => {
  const result = await validate(model, {
    id: '22',
    name: 'ray'
  })
  expect(result.id).toBe(22)
})

test('withShapeValidation applies model attributes to args', async () => {
  const mockHandlerFn = (props: any) => props.args
  const getArgs = (props: any) => props.req.query
  const props = {
    req: {
      query: {
        id: 22,
        name: 'mock-nmame'
      }
    }
  } as any as Props
  const args = await withShapeValidation(mockHandlerFn, model, getArgs, props)
  expect(args.id).toBe(props.req.query.id)
  expect(args.name).toBe(props.req.query.name)
})
