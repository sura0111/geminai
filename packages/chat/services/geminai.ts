import { GoogleGenerativeAI } from '@google/generative-ai'
import { type ModelParams } from '@google/generative-ai'

export const useGeminai = (apiKey: string, config: ModelParams) => {
  const ai = new GoogleGenerativeAI(apiKey)

  return ai.getGenerativeModel(config)
}
