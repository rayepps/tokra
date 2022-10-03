import { compose } from 'radash'
import type { Props } from 'tokra'
import { error } from 'tokra'
import { useNext } from 'tokra-use-next'
import { usePathParams } from 'tokra-use-path-params'
import { useServices } from 'tokra-use-services'
import makeDatabase, { Database } from '../../../../../backend/database'
import * as t from '../../../../../backend/types'
import * as mappers from '../../../../../backend/view/mappers'

type Args = {
  id: t.Id<'timeout'>
}
type Services = {
  db: Database
}
type Response = {
  timeout: t.TimeoutView
}

export const getTimeoutById = async ({
  services,
  args
}: Props<Args, Services>): Promise<Response> => {
  const { db } = services
  const timeout = await db.timeouts.find(args.id)
  if (!timeout) {
    throw error({
      cause: 'NOT_FOUND',
      status: 404,
      message: 'Timeout not found',
      note: `Timeout with the id ${args.id} was not found in the database`,
      key: 'cb.err.timeout.find.unfound'
    })
  }
  return {
    timeout: mappers.TimeoutView.from(timeout)
  }
}

export default compose(
  useNext(),
  usePathParams('/v1/timeout/{id}'),
  useServices<Services>({
    db: makeDatabase
  }),
  getTimeoutById
)
