import keytar from 'keytar'

export const useConfig = (service: string, account: string) => {
  const configStore = {
    getValue: async (key: string): Promise<string | null> => {
      return await keytar.getPassword(service, account)
    },
    setValue: async (key: string, value: string | null) => {
      if (value === null) {
        await keytar.deletePassword(service, account)
      } else {
        await keytar.setPassword(service, account, value)
      }
    },
  }

  return configStore
}
