import { ConfigType } from './types'
import { getFileType, validateFileType } from './utils'
import SaveLogToFile from './modules/SaveLogToFile'

class ConsoleWatcher {
  private nativeConsoleLog: (...args: any[]) => void
  private nativeConsoleInfo: (...args: any[]) => void
  private nativeConsoleError: (...args: any[]) => void

  private printInConsole: boolean
  private saveToFile: boolean
  private logFilePath: string

  constructor(config: ConfigType = {}) {
    // Stores the native console.log, console.info and console.error function in a variable.
    this.nativeConsoleLog = console.log
    this.nativeConsoleInfo = console.info
    this.nativeConsoleError = console.error

    this.printInConsole =
      config.printInConsole === undefined ? true : config.printInConsole
    this.saveToFile = config.saveToFile === undefined ? true : config.saveToFile
    this.logFilePath =
      (config.logFilePath && validateFileType(config.logFilePath)) ||
      'consoleWatcher.log'

    this.overrideConsoleLog()
    this.overrideConsoleInfo()
    this.overrideConsoleError()
  }

  private overrideConsoleLog(): void {
    console.log = (...args: any[]) => {
      const logData = this.formatArgsAsObject(args, 'log')

      if (this.saveToFile) {
        this.saveLogToFile(logData)
      }

      if (this.printInConsole) {
        this.nativeConsoleLog(...args)
      }
    }
  }

  private overrideConsoleInfo(): void {
    console.info = (...args: any[]) => {
      const logData = this.formatArgsAsObject(args, 'info')

      if (this.saveToFile) {
        this.saveLogToFile(logData)
      }

      if (this.printInConsole) {
        this.nativeConsoleInfo(...args)
      }
    }
  }

  private overrideConsoleError(): void {
    console.error = (...args: any[]) => {
      const logData = this.formatArgsAsObject(args, 'error')

      if (this.saveToFile) {
        this.saveLogToFile(logData)
      }

      if (this.printInConsole) {
        this.nativeConsoleError(...args)
      }
    }
  }

  private formatArgsAsObject(args: any[], type: string): object {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: type,
      messages: args,
    }
    return logEntry
  }

  private saveLogToFile(logData: object): void {
    const logFileType = getFileType(this.logFilePath)
    if (logFileType === 'json') {
      SaveLogToFile.appendToJSONFile(this.logFilePath, logData)
    } else {
      SaveLogToFile.appendToNonJSONFile(this.logFilePath, logData)
    }
  }
}

export default ConsoleWatcher
