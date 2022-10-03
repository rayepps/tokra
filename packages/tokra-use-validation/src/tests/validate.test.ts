import { expect, test } from '@jest/globals'
import type { AbstractRequest, Props } from 'tokra'
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
  const mockHandlerFn = (props: Props) => props.args
  const getArgs = (props: Props) => props.request.query
  const props: Pick<Props, 'request'> = {
    request: {
      query: {
        id: 22,
        name: 'mock-nmame'
      }
    } as unknown as AbstractRequest
  }
  const args = await withShapeValidation(
    mockHandlerFn,
    model,
    getArgs,
    props as Props
  )
  expect(args.id).toBe(props.request.query.id)
  expect(args.name).toBe(props.request.query.name)
})
