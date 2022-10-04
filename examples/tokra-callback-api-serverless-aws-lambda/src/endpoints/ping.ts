import { compose } from 'radash'
import type { Props } from 'tokra'
import { useLambda } from 'tokra-use-lambda'

type Args = {}
type Services = {}
type Response = {
  message: 'pong'
}

export const pingEndpoint = async ({}: Props<
  Args,
  Services
>): Promise<Response> => ({
  message: 'pong'
})

export default compose(useLambda(), pingEndpoint)
