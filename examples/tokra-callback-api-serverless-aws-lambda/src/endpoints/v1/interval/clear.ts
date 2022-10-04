import { compose } from 'radash'
import type { Props } from 'tokra'
import { useLambda } from 'tokra-use-lambda'
import { usePathParams } from 'tokra-use-path-params'
import { useServices } from 'tokra-use-services'
import makeDatabase, { Database } from '../../../database'
import * as t from '../../../types'

type Args = {
  id: t.Id<'interval'>
}
type Services = {
  db: Database
}
type Response = void

export const clearIntervalEndpoint = async ({
  services,
  args
}: Props<Args, Services>): Promise<Response> => {
  const { db } = services
  await db.intervals.patch(args.id, {
    status: 'cleared'
  })
}

export default compose(
  useLambda(),
  usePathParams('/v1/interval/{id}/clear'),
  useServices<Services>({
    db: makeDatabase
  }),
  clearIntervalEndpoint
)
