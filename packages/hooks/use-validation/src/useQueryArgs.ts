import * as yup from 'yup'
import { partial } from 'radash'
import { Props, ApiFunction } from '@exobase/core'
import { useValidation } from './useValidation'
import { Yup, KeyOfType } from './types'

export const useQueryArgs = partial(
  useValidation,
  (props: Props) => props.req.query
) as <TArgs>(
  shapeMaker: (yup: Yup) => KeyOfType<TArgs, any>
) => (func: ApiFunction) => ApiFunction
