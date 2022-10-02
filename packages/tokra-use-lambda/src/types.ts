import { Context } from 'aws-lambda'
import type { Request } from 'tokra'

export type LambdaRequest<TEvent = any> = Request & {
  event: TEvent
  context: Context
}
