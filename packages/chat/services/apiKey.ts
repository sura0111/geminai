import { useConfig } from '@/repositories'
import { logger } from '@/services/logger'
import path from 'path'
import prompts from 'prompts'
import yargs from 'yargs/yargs'
import { fileURLToPath } from 'url'

export const useApiKey = async () => {
  const config = useConfig(path.join(path.dirname(fileURLToPath(import.meta.url)), '../config.json'))
  const apiKey = yargs(process.argv.slice(2))
    .options('apiKey', {
      alias: 'k',
      type: 'string',
      description: 'https://makersuite.google.com/app/apikey',
    })
    .parseSync().apiKey

  if (apiKey) {
    config.setValue('apiKey', apiKey)
  }

  const existingAiKey = config.getValue('apiKey')

  if (existingAiKey === null || existingAiKey.trim() === '') {
    if (!apiKey) {
      const response = await prompts(
        {
          name: 'apiKey',
          type: 'password',
          message: 'Enter your Gemini API key:',
          instructions: 'https://makersuite.google.com/app/apikey',
        },
        {
          onSubmit: (_prompt, answer: string) => {
            if (answer.trim() === '') {
              logger.error('API key is required')
              process.exit()
            }
          },
          onCancel: () => {
            process.exit()
          },
        },
      )

      const apiKey = response.apiKey as string
      config.setValue('apiKey', apiKey)
      return apiKey
    } else {
      config.setValue('apiKey', apiKey)
      return apiKey
    }
  }
  return existingAiKey
}
