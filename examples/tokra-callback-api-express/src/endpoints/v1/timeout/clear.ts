import { compose } from 'radash'
import type { Props } from 'tokra'
import { useExpress } from 'tokra-use-express'
import { usePathParams } from 'tokra-use-path-params'
import { useServices } from 'tokra-use-services'
import makeDatabase, { Database } from '../../../database'
import * as t from '../../../types'

type Args = {
  id: t.Id<'timeout'>
}
type Services = {
  db: Database
}
type Response = void

export const clearTimeoutEndpoint = async ({
  services,
  args
}: Props<Args, Services>): Promise<Response> => {
  const { db } = services
  await db.timeouts.patch(args.id, {
    status: 'cleared'
  })
}

const endpoint: t.Endpoint = {
  handler: compose(
    useExpress(),
    usePathParams('/v1/timeout/{id}/clear'),
    useServices<Services>({
      db: makeDatabase
    }),
    clearTimeoutEndpoint
  ),
  config: {
    method: 'PUT',
    path: '/v1/timeout/:id/clear'
  }
}

export default endpoint
