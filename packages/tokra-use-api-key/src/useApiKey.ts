import { isFunction, partial, partob } from 'radash'
import type { Props, ApiFunction } from 'tokra'
import { error } from 'tokra'

type PropsGetter<T> = (props: Props) => Promise<T>

export const unauthorized = partob(error, {
  message: 'Not Authenticated',
  status: 401,
  cause: 'NOT_AUTHENTICATED'
})

export async function withApiKey(
  func: ApiFunction,
  keyFunc: string | PropsGetter<string>,
  props: Props
) {
  const header = props.req.headers['x-api-key'] as string

  const key = !isFunction(keyFunc)
    ? keyFunc
    : await (keyFunc as PropsGetter<string>)(props)

  if (!header) {
    throw unauthorized({
      note: 'This function requires an api key',
      key: 'exo.err.core.auth.canes-venarias'
    })
  }

  const providedKey = header.startsWith('Key ') && header.replace('Key ', '')

  if (!key || !providedKey || providedKey !== key) {
    throw unauthorized({
      note: 'Invalid api key',
      key: 'exo.err.core.auth.balefeign'
    })
  }

  return await func(props)
}

export const useApiKey =
  (key: string | PropsGetter<string>) => (func: ApiFunction) => {
    return partial(withApiKey, func, key)
  }
