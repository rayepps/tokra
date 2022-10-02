import { ApiError } from './types'

// Used by ./resposne.ts to detect if a thrown error
// was produced by this module or not
export const ERROR_NAME = 'tokra.error'

export const createError = <
  T extends Partial<ApiError>,
  K extends Partial<ApiError>
>(
  input: T
) => {
  return (data: K) =>
    ({
      ...input,
      ...data,
      name: ERROR_NAME
    } as ApiError)
}

//
// GENERIC ERRORS
//
// Try to use these as little as possible, opt
// for creating more specific error objects
// using these as a base.
//

export const unknown = createError({
  message: 'Unknown Error',
  status: 500,
  code: 5000,
  details:
    'This one is on us, we apologize for the issue. The issue has been logged and our development team will be working on fixing it asap.'
}) as (input: { details?: string; key: string }) => ApiError

export const badRequest = createError({
  message: 'Bad Request',
  status: 400,
  code: 4000
}) as (input: { key: string; details: string }) => ApiError

export const unauthorized = createError({
  message: 'Not Authenticated',
  status: 401,
  code: 4010
}) as (input: { key: string; details: string }) => ApiError

export const forbidden = createError({
  message: 'Not Authorized',
  status: 403,
  code: 4030
}) as (input: { key: string; details: string }) => ApiError

export const notFound = createError({
  message: 'Not Found',
  status: 404,
  code: 4040
}) as (input: { key: string; details: string }) => ApiError

export default {
  createError,
  unknown,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
}
