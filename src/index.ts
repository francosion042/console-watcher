import { ConfigType } from './types'
import { getFileType, validateFileType } from './utils'
import SaveLogToFile from './modules/SaveLogToFile'

class ConsoleWatcher {
  // Native console methods references
  private nativeConsoleLog: (...args: any[]) => void
  private nativeConsoleInfo: (...args: any[]) => void
  private nativeConsoleError: (...args: any[]) => void

  // Configuration settings
  private printInConsole: boolean
  private saveToFile: boolean
  private logFilePath: string

  constructor(config: ConfigType = {}) {
    // Store the original console functions to restore their functionality later
    this.nativeConsoleLog = console.log
    this.nativeConsoleInfo = console.info
    this.nativeConsoleError = console.error

    // Set configuration options, default to true if not provided
    this.printInConsole =
      config.printInConsole === undefined ? true : config.printInConsole
    this.saveToFile = config.saveToFile === undefined ? true : config.saveToFile

    // Set log file path and validate its type, default to 'consoleWatcher.log' if not provided
    this.logFilePath =
      (config.logFilePath && validateFileType(config.logFilePath)) ||
      'consoleWatcher.log'

    // Override the native console functions to provide custom behavior
    this.overrideConsoleLog()
    this.overrideConsoleInfo()
    this.overrideConsoleError()
  }

  // Override the console.log method
  private overrideConsoleLog(): void {
    console.log = (...args: any[]) => {
      // Format the arguments for logging
      const logData = this.formatArgsAsObject(args, 'log')

      // If saving to file is enabled, save the log
      if (this.saveToFile) {
        this.saveLogToFile(logData)
      }

      // If printing to console is enabled, display the log
      if (this.printInConsole) {
        this.nativeConsoleLog(...args)
      }
    }
  }

  // Override the console.info method
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

  // Override the console.error method
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

  // Format console arguments into a structured log entry
  private formatArgsAsObject(args: any[], type: string): object {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: type,
      messages: args,
    }
    return logEntry
  }

  // Save the structured log entry to a file
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
