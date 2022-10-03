import { Context } from 'aws-lambda'
import type { AbstractRequest } from 'tokra'

export type LambdaRequest<TEvent = any> = AbstractRequest & {
  event: TEvent
  context: Context
}
