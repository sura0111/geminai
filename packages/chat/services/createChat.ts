import { createChatHistory } from '@/repositories'
import { logger } from '@/services/core'
import { type GenerativeModel } from '@google/generative-ai'
import readline from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

export const createChat = async (
  geminai: GenerativeModel,
  options?: { filePath?: string; condition?: string; response?: string },
) => {
  const rl = readline.createInterface({ input: stdin, output: stdout, tabSize: 2 })
  const chatHistory = await createChatHistory(options)

  const chat = geminai.startChat({
    history: chatHistory.history,
  })

  logger.info(`${chatHistory.aiResponse}\n([Type \`END\` to send the chat]`)

  const startChat = async () => {
    const getPromptResponse = async (
      question: string,
      { endFlag = 'END\n' }: { endFlag?: string } = { endFlag: 'END' },
    ) => {
      let output = ''
      return await new Promise<string>((resolve, reject) => {
        const askOnce = async (question: string = '') => {
          if (question) {
            rl.on('line', (answer: string) => {
              output += `\n${answer}`
              if (answer.endsWith(endFlag)) {
                resolve(output.replace(/END$/, ''))
                return
              }
              void (async () => {
                await askOnce()
              })()
            })
          }
        }

        void (async () => {
          await askOnce(question)
        })()
      })
    }

    const question: string = await getPromptResponse(chatHistory.aiResponse)

    try {
      if (question.trim() === '') {
        return
      }

      const { response } = await chat.sendMessage(question)
      logger.log(`${response.text()}'\n------------------\n`)

      await startChat()
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message)
      }
    }
  }

  return {
    start: startChat,
  }
}
