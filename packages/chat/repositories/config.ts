import fs from 'node:fs'
import { type ConfigKeyProperty } from '@geminai/chat/types'

export const useConfig = (filePath: string) => {
  const hasFile = fs.existsSync(filePath)
  if (!hasFile) {
    fs.writeFileSync(filePath, '{}')
  }
  const store: ConfigKeyProperty = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  const configStore = {
    getValue: <T extends keyof ConfigKeyProperty>(key: T): ConfigKeyProperty[T] | null => {
      return store[key] ?? null
    },
    setValue: <T extends keyof ConfigKeyProperty>(key: T, value: ConfigKeyProperty[T] | null) => {
      if (value === null) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete store[key]
      } else {
        store[key] = value
      }
      fs.writeFileSync(filePath, JSON.stringify(store, undefined, 2))
    },
  }

  return configStore
}
