import { args, useConfig } from '@/repositories'
import { logger } from '@/services/core/logger'
import prompts from 'prompts'
import { ConfigKey, serviceName } from '@/constants'
import os from 'node:os'

export const useApiKey = async () => {
  const config = useConfig(serviceName, os.userInfo().username)

  const apiKey = args.apiKey

  if (apiKey) {
    await config.setValue(ConfigKey.apiKey, apiKey)
  }

  const existingAiKey = await config.getValue(ConfigKey.apiKey)

  if (existingAiKey === null || existingAiKey.trim() === '') {
    if (!apiKey) {
      const response = await prompts(
        {
          name: ConfigKey.apiKey,
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
      await config.setValue(ConfigKey.apiKey, apiKey)
      return apiKey
    } else {
      await config.setValue(ConfigKey.apiKey, apiKey)
      return apiKey
    }
  }
  return existingAiKey
}
