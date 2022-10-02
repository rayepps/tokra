import { ApiError } from './types'

// Used by ./resposne.ts to detect if a thrown error
// was produced by this module or not
export const ERROR_NAME = 'tokra.error'

export const error = (input: Omit<ApiError, 'name'>) =>
  ({
    ...input,
    name: ERROR_NAME
  } as ApiError)

// export const badRequest = partob(error, {
//   message: 'Bad Request',
//   status: 400,
//   code: 4000
// })

// export const unauthorized = partob(error, {
//   message: 'Not Authenticated',
//   status: 401,
//   code: 4010
// })

// export const forbidden = partob(error, {
//   message: 'Not Authorized',
//   status: 403,
//   code: 4030
// })

// export const notFound = partob(error, {
//   message: 'Not Found',
//   status: 404,
//   code: 4040
// })
