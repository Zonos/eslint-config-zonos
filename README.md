# `@zonos/eslint-config-zonos`


```
pnpm i -D @zonos/eslint-config-zonos
```

## Usage

`eslint.config.mjs`

```js
import configZonos from '@zonos/eslint-config-zonos';

export default [
  ...,
  configZonos.configs.base,
  ...,
]
```

### Configs

- `configZonos.configs.next` - Next.js projects
- `configZonos.configs.base` - Typescript applications