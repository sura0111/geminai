import { defaultAiResponse, defaultUserCondition } from '@/constants'
import { type InputContent } from '@google/generative-ai'
import path from 'node:path'
import { readFile } from '@/repositories'

export const createChatHistory = async (options?: {
  filePath?: string
  condition?: string
  response?: string
}): Promise<{ history: InputContent[]; aiResponse: string }> => {
  const aiResponse = options?.response ?? defaultAiResponse
  const file = options?.filePath
    ? {
        name: path.basename(options.filePath),
        extension: path.extname(options.filePath),
        content: await readFile(options.filePath),
      }
    : undefined
  return {
    history: [
      {
        role: 'user',
        parts: [
          ...(file
            ? [
                {
                  text: `here is provided file (${file.name}):\n\`\`\`${file.extension}\n${file.content}\n\`\`\``,
                },
              ]
            : []),
          {
            text: options?.condition ?? defaultUserCondition,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: aiResponse,
          },
        ],
      },
    ],
    aiResponse,
  }
}
