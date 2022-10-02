import _ from 'radash'
import type { ApiFunction, Props } from 'tokra'
import { initProps, responseFromError, responseFromResult } from 'tokra'
import { LambdaRequest } from './types'

export type LambdaOptions = {
  callbackWaitsForEmptyEventLoop?: boolean
}

export async function withLambda(
  func: ApiFunction,
  options: LambdaOptions,
  event: AWSLambda.APIGatewayEvent,
  context: AWSLambda.Context
) {
  const props: Props = initProps(makeReq(event, context))

  const [error, result] = await _.try<any>(func)(props)
  if (error) {
    console.error(error)
  }

  const response = error ? responseFromError(error) : responseFromResult(result)

  context.callbackWaitsForEmptyEventLoop =
    options.callbackWaitsForEmptyEventLoop === false ? false : true

  // @link https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html
  return {
    body: JSON.stringify(response.body ?? {}),
    isBase64Encoded: false,
    headers: {
      'content-type': 'application/json',
      ...response.headers
    },
    statusCode: response.status
  }
}

export const useLambda = (options?: LambdaOptions) => (func: ApiFunction) => {
  return _.partial(withLambda, func, options ?? {})
}

const makeReq = (
  event: AWSLambda.APIGatewayEvent,
  context: AWSLambda.Context
): LambdaRequest => {
  const headers = _.lowerize((event.headers as Record<string, string>) ?? {})
  return {
    headers,
    url: event.path,
    body: (() => {
      if (!event.body || event.body === '') {
        return {}
      }
      if (event.isBase64Encoded) {
        return JSON.parse(Buffer.from(event.body, 'base64').toString())
      }
      if (_.isString(event.body)) {
        return JSON.parse(event.body)
      }
      return event.body
    })(),
    method:
      event.requestContext?.httpMethod ??
      event.httpMethod ??
      (event.requestContext as any)?.http?.method ??
      '',
    query: (event.queryStringParameters as Record<string, string>) ?? {},
    ip:
      (event.requestContext as any)?.http?.sourceIp ??
      event.requestContext?.identity?.sourceIp,
    event,
    context
  }
}
