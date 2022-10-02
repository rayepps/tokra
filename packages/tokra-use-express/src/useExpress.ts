import makeCompressionMiddleware from 'compression'
import type { NextFunction, Request, Response } from 'express'
import { json as makeJsonMiddleware } from 'express'
import { partial, sift, try as tryit } from 'radash'
import type {
  ApiFunction,
  Props,
  Request as ExoRequest,
  Response as ExoResponse
} from 'tokra'
import { initProps, responseFromError, responseFromResult } from 'tokra'

type ExpressMiddlewareFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => void
type InvertedMiddlewareFunc = (req: Request, res: Response) => Promise<Request>

export type ExpressFunctionOptions = {
  skipJson?: boolean
  skipCompression?: boolean
}

const applyJson = invertMiddleware(makeJsonMiddleware())
const applyCompression = invertMiddleware(
  (makeCompressionMiddleware as unknown as Function)()
)

const makeMiddleware = (options: ExpressFunctionOptions) => {
  return sift([
    !options.skipJson && applyJson,
    !options.skipCompression && applyCompression
  ]) as InvertedMiddlewareFunc[]
}

export async function withExpress(
  func: ApiFunction,
  options: ExpressFunctionOptions,
  req: Request,
  res: Response
) {
  const middleware = composeMiddleware(...makeMiddleware(options))
  const reqAfterMiddlware = await middleware(req, res)
  const props: Props = initProps(makeReq(reqAfterMiddlware))

  const [error, result] = await tryit<any>(func)(props)
  if (error) console.error(error)

  const response = error ? responseFromError(error) : responseFromResult(result)
  setResponse(res, response)
}

export const useExpress =
  (options: ExpressFunctionOptions = {}) =>
  (func: ApiFunction) =>
    partial(withExpress, func, options)

export function setResponse(res: Response, response: ExoResponse) {
  const { body, status = 200, headers = {} } = response as ExoResponse
  res.status(status)
  for (const [key, val] of Object.entries(headers)) {
    res.set(key, val)
  }
  res.json(body)
}

const makeReq = (req: Request): ExoRequest => ({
  headers: req.headers as Record<string, string | string[]>,
  url: req.originalUrl,
  body: req.body,
  method: req.method,
  query: req.query as Record<string, string>,
  ip: `${req.socket.remoteAddress}`
})

/**
 * Middleware functions. Special helpers needed to get
 * express middleware functions inline to play in the
 * fait way. Express middleware functions run async
 * and when they are done they return nothing, they
 * just modify the request. These help us process that
 * and then combine them.
 */
function invertMiddleware(
  middleware: ExpressMiddlewareFunc
): InvertedMiddlewareFunc {
  return async (req, res) => {
    return await new Promise((resolve, reject) => {
      const next = (err?: Error) => {
        if (err) reject(err)
        else resolve(req)
      }
      middleware(req, res, next as NextFunction)
    })
  }
}

function composeMiddleware(
  ...funcs: InvertedMiddlewareFunc[]
): InvertedMiddlewareFunc {
  return async (req: Request, res: Response) => {
    let r = req
    for (const func of funcs) {
      r = await func(r, res)
    }
    return r
  }
}
