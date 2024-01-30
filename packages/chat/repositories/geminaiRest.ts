import { geminaiApiUrl } from '@/constants'
import {
  type GenerateContentResponse,
  type InputContent,
  type ModelParams,
  type StartChatParams,
} from '@google/generative-ai'
// import https from 'node:https'

export class GoogleGenerativeAI {
  public apiKey: string

  public constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  public getGenerativeModel(modelParams: ModelParams) {
    const baseURL = `${geminaiApiUrl}/${modelParams.model}:generateContent?key=${this.apiKey}`

    const startChat = (params: StartChatParams) => {
      const history = [...(params.history ?? [])]

      const sendMessage = async (text: string) => {
        const userInputContent: InputContent = {
          role: 'user',
          parts: [{ text }],
        }
        const safetySettings = params.safetySettings ?? modelParams.safetySettings
        const generationConfig = params.generationConfig ?? modelParams.generationConfig

        const response = await fetch(baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [...history, userInputContent],
            ...(safetySettings ? { safetySettings } : {}),
            ...(generationConfig ? { generationConfig } : {}),
          }),
        })

        const data: GenerateContentResponse = await response.json()

        history.push(userInputContent, ...(data.candidates ?? []).map((candidate) => candidate.content))

        return {
          response: {
            text: () =>
              data.candidates?.map((candidate) => candidate.content.parts.map((part) => part.text)).join('\n') ?? '',
          },
        }
      }

      return {
        sendMessage,
      }
    }

    return {
      startChat,
    }
  }
}
