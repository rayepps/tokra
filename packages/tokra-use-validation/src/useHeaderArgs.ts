import { partial } from 'radash'
import type { Props, ApiFunction } from 'tokra'
import { useValidation } from './useValidation'
import { Yup, KeyOfType } from './types'

export const useHeaderArgs = partial(
  useValidation,
  (props: Props) => props.req.headers
) as <TArgs = any>(
  shapeMaker: (yup: Yup) => KeyOfType<TArgs, any>
) => (func: ApiFunction) => ApiFunction
