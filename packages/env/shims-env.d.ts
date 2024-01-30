import { type EnvironmentVariables } from '@packages/env/types'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export {}
