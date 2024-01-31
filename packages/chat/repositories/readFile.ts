import fs from 'node:fs/promises'
import path from 'node:path'

export const readFile = async (filePath: string) => {
  try {
    return await fs.readFile(filePath.startsWith('/') ? filePath : path.resolve(process.cwd(), filePath), 'utf-8')
  } catch (error) {
    console.log((error as Error).message)
    return undefined
  }
}
