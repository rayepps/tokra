import * as yup from 'yup'
import { partial } from 'radash'
import type { Props, ApiFunction } from 'tokra'
import { useValidation } from './useValidation'
import { Yup, KeyOfType } from './types'

export const useJsonArgs = partial(
  useValidation,
  (props: Props) => props.req.body
) as <TArgs = any>(
  shapeMaker: (yup: Yup) => KeyOfType<TArgs, any>
) => (func: ApiFunction) => ApiFunction
