import * as yup from 'yup'
import { partial } from 'radash'
import { Props, ApiFunction } from '@exobase/core'
import { Yup, KeyOfType } from './types'

export const validate = async (model: any, args: any) =>
  await model.validate(args, {
    stripUnknown: true,
    strict: false,
    abortEarly: true
  })

export const withShapeValidation = async (
  func: ApiFunction,
  model: any,
  getArgs: (props: Props) => Record<string, any>,
  props: Props
) => {
  let validArgs = {}
  try {
    validArgs = await validate(model, getArgs(props))
  } catch (err) {
    throw exo.errors.jsonValidationFailed({
      details: err.message,
      key: 'lune.api.err.core.args.baradoor'
    })
  }
  return await func({
    ...props,
    args: {
      ...props.args,
      ...validArgs
    }
  })
}

export const useValidation =
  <TArgs = any>(
    getData: (props: Props) => any,
    shapeMaker: (yup: Yup) => KeyOfType<TArgs, any>
  ) =>
  (func: ApiFunction) => {
    const model = yup.object(shapeMaker(yup))
    return partial(withShapeValidation, func, model, getData)
  }
