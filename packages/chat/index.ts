import prompts from 'prompts'
import { useGeminai } from '@/services'
import init from '@/init'
import { useLogger } from '@/repositories'

const logger = useLogger('geminai\n')

const createChat = (geminai: ReturnType<typeof useGeminai>) => {
  const chat = geminai.startChat({
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'You are professional fullstack engineer who mostly uses nodejs, typescript, vite, vue, vitest and nuxt.',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Ok, I got it, what would you like to know?',
          },
        ],
      },
    ],
  })

  const startChat = async (aiQuestion = '') => {
    const getPromptResponse = async (
      question: string,
      { endFlag = 'END\n' }: { endFlag?: string } = { endFlag: 'END' },
    ) => {
      let output = ''
      return await new Promise<string>((resolve, reject) => {
        const askOnce = async (question: string = '') => {
          await prompts(
            {
              type: 'text',
              name: 'question',
              message: question ? `${question}, endFlag: END` : '',
            },
            {
              onSubmit: (prompt, answer: string) => {
                output += `\n${answer}`
                if (answer.endsWith(endFlag)) {
                  logger.log('------------')
                  resolve(output)
                  return
                }
                void (async () => {
                  await askOnce()
                })()
              },
              onCancel: () => {
                process.exit()
              },
            },
          )
        }

        void (async () => {
          await askOnce(question)
        })()
      })
    }

    const question: string = await getPromptResponse(aiQuestion)

    try {
      if (question.trim() === '') {
        return
      }

      const aiResponse = await chat.sendMessage(question)

      const aiAnswer = aiResponse.response.text()

      logger.log(aiAnswer)
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

const main = async () => {
  const apiKey = await init()
  const geminai = useGeminai(apiKey, { model: 'gemini-pro' })
  const chat = createChat(geminai)
  await chat.start('Hi, What would you like to know?')
}

void main()
