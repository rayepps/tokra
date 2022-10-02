# `tokra-use-next`

> Exobase root hook to handle function running on Next.js api functions

## Install

```sh
yarn add tokra-use-next
```

## Usage

```ts
import { compose } from 'radash'
import type { Props } from 'tokra'
import { useNext } from 'tokra-use-next'

export const pingEndpoint = async (props: Props) => {
  return {
    message: 'pong'
  }
}

export default compose(useNext(), pingEndpoint)
```
