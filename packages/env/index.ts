import dotenvFlow from 'dotenv-flow'
import dotenvExpand from 'dotenv-expand'
import { type EnvironmentVariables } from './types'

const config = dotenvFlow.config({ path: __dirname })

export const env = dotenvExpand.expand(config).parsed as EnvironmentVariables
