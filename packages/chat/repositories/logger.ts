import logdown from 'logdown'

export const useLogger = (prefix: string) => {
  const logger = logdown(prefix)
  logger.state.isEnabled = true

  return logger
}
