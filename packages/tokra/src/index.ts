// IMPORT
import { error } from './error'
import {
  initProps,
  defaultResponse,
  responseFromError,
  responseFromResult
} from './response'

// EXPORT
export { error } from './error'
export {
  initProps,
  defaultResponse,
  responseFromError,
  responseFromResult
} from './response'

export * from './types'

export default {
  error,
  defaultResponse,
  initProps,
  responseFromError,
  responseFromResult
}
