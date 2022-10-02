import { partial } from 'radash'
import type { ApiFunction, Props } from 'tokra'
import { KeyOfType, Yup } from './types'
import { useValidation } from './useValidation'

export const useJsonArgs = partial(
  useValidation,
  (props: Props) => props.req.body
) as <TArgs = any>(
  shapeMaker: (yup: Yup) => KeyOfType<TArgs, any>
) => (func: ApiFunction) => ApiFunction
