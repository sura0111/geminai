import { ConfigKey, defaultAiResponse, defaultUserCondition } from '@/constants'
import Yargs from 'yargs/yargs'

export const args = Yargs(process.argv.slice(2))
  .options(ConfigKey.apiKey, {
    alias: 'k',
    type: 'string',
    description: 'https://makersuite.google.com/app/apikey',
  })
  .options(ConfigKey.file, {
    alias: 'f',
    type: 'string',
    description: 'The path to a file containing code as an input',
  })
  .options(ConfigKey.condition, {
    alias: 'c',
    type: 'string',
    description: 'The condition to start the chat',
    default: defaultUserCondition,
  })
  .options(ConfigKey.response, {
    alias: 'r',
    type: 'string',
    description: 'The response to the user condition',
    default: defaultAiResponse,
  })
  .parseSync()
