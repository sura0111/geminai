#!/usr/bin/env node

import { args } from '@/repositories'
import { createChat, useApiKey, useGeminai } from '@/services'

const main = async () => {
  const apiKey = await useApiKey()
  const geminai = useGeminai(apiKey, { model: 'gemini-pro' })
  const chat = await createChat(geminai, {
    filePath: args.file,
    response: args.response,
    condition: args.condition,
  })
  await chat.start()
}

void main()
