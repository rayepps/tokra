// IMPORT
import _errors from './errors'
import {
  initProps,
  defaultResponse,
  responseFromError,
  responseFromResult
} from './response'

// EXPORT
export const errors = _errors
export {
  initProps,
  defaultResponse,
  responseFromError,
  responseFromResult
} from './response'

export * from './types'

export default {
  errors: _errors,
  defaultResponse,
  initProps,
  responseFromError,
  responseFromResult
}
