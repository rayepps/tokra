import type { Request } from 'tokra'
import { Context } from 'aws-lambda'

export type LambdaRequest<TEvent=any> = Request & {
    event: TEvent
    context: Context
}