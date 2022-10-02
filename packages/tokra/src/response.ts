import * as t from './types'
import { error, ERROR_NAME } from './error'
import { partob } from 'radash'
import { ApiError, ApiSuccessResponse, ApiErrorResponse } from './types'

export const defaultResponse: t.Response = {
  _type: '__response__',
  status: 200,
  headers: {},
  body: {
    message: 'success'
  }
}

const unknown = partob(error, {
  message: 'Unknown Error',
  status: 500,
  cause: 'UNKNOWN',
  note: 'This one is on us, we apologize for the issue. The issue has been logged and our development team will be working on fixing it asap.'
})

export const initProps = (req: t.Request): t.Props => ({
  auth: {},
  args: {},
  services: {},
  response: defaultResponse,
  req
})

/**
 * There is a 1 in 1,000,000,000 chance that someone may
 * return an object with _type equal to '_response'
 * and this will break. Nobody do that...
 */
const isResponse = (obj: any): boolean => {
  return obj?._type === '__response__'
}

export const responseFromResult = (result: any): t.Response => {
  const makeOk = <T>(
    result: T,
    status = 200
  ): Omit<ApiSuccessResponse<T>, 'version'> => ({
    error: null,
    result,
    status
  })

  if (isResponse(result)) {
    return result as t.Response
  }

  // If nothing was returned then return the default
  // ok response
  if (!result)
    return {
      ...defaultResponse,
      body: makeOk(defaultResponse.body)
    }

  // Else, the func returned something that should be
  // returned as the json body response
  return {
    ...defaultResponse,
    body: makeOk(result)
  }
}

export const responseFromError = (error: any): t.Response => {
  const makeError = (error: ApiError): Omit<ApiErrorResponse, 'version'> => ({
    error,
    result: null,
    status: error.status
  })

  if (isResponse(error)) {
    return error as t.Response
  }

  // If its our custom error then respond with the
  // data indicated by our error object
  if (error && error.name === ERROR_NAME) {
    return {
      ...defaultResponse,
      status: error.status,
      body: makeError(error as t.ApiError)
    }
  }

  // Else its some generic error then wrap it in our
  // error object as an unknown error
  const err = unknown({
    key: 'nf.err.api.core.express.fairtex'
  })
  return {
    ...defaultResponse,
    status: err.status,
    body: makeError(err)
  }
}
