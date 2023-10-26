import { ConfigType, SyncToCloudConfigType } from './types'
import {
  encrypt,
  getFileType,
  validateFileType,
} from './utils'
import WriteLogToFile from './modules/WriteLogToFile'
import ReadLogsFromFile from './modules/ReadLogsFromFile'
import SyncLogsToCloud from './modules/SyncLogsToCloud'
import GlobalErrorHandler from './errors/GlobalErrorHandler'

class ConsoleWatcher extends GlobalErrorHandler {
  // Native console methods references
  private nativeConsoleMethods: { [key: string]: (...args: any[]) => void } = {}

  // Configuration settings
  private printInConsole: boolean
  private saveToFile: boolean
  private logFilePath: string

  /**
   *
   * @param {object} config
   * @param {boolean} config.printInConsole - Optional - defaults to true
   * @param {boolean} config.saveToFile - Optional - defaults to true
   * @param {string} config.logFilePath - Optional - accepts ['.log', '.txt', '.json'] files - defaults to 'consoleWatcher.log'
   */
  constructor(config: ConfigType = {}) {
    super()
    // Store the original console functions to restore their functionality later
    this.nativeConsoleMethods = {
      log: console.log,
      info: console.info,
      error: console.error,
    }

    // Set configuration options, default to true if not provided
    this.printInConsole =
      config.printInConsole === undefined ? true : config.printInConsole
    this.saveToFile = config.saveToFile === undefined ? true : config.saveToFile

    // Set log file path and validate its type, default to 'consoleWatcher.log' if not provided
    this.logFilePath =
      (config.logFilePath && validateFileType(config.logFilePath)) ||
      'consoleWatcher.log'

    // Override the native console functions to provide custom behavior
    this.overrideConsoleMethods()
  }

  private overrideConsoleMethods(): void {
    ;(['log', 'info', 'error'] as const).forEach((method) => {
      console[method] = (...args: any[]) => {
        const logData = this.formatArgsAsObject(args, method)

        if (this.saveToFile) {
          this.saveLogToFile(logData)
        }

        if (this.printInConsole) {
          this.nativeConsoleMethods[method](...args)
        }
      }
    })
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
      WriteLogToFile.appendToJSONFile(this.logFilePath, logData)
    } else {
      WriteLogToFile.appendToNonJSONFile(this.logFilePath, logData)
    }
  }

  /**
   * @description Users who wish to have their logs where it'd be easier for them to see can create an account on the console watcher web platform
   * the logs are encrypted and stored on the database and can only be decrypted by the user on the frontend.
   * @param {object} config
   * @param {string} config.apiKey
   * @param {string} config.applicationKey
   * @param {string} config.encryptionKey - A Key private to you, do not lose or change this key to avoid losing already encrypted data.
   */
  public async syncToConsoleWatcherCloud(config: SyncToCloudConfigType) {
    // Ensures saveToFile is set to true when calling this method
    this.saveToFile = true

    // Validate the length of the encryptionKey
    if (config.encryptionKey.length !== 16) {
      return this.handleError(new Error('Invalid encryptionKey length. Expected 16 characters.'))
    }

    // //////////////////////////
    const logFileType = getFileType(this.logFilePath)

    let logs = []
    if (logFileType === 'json') {
      logs = ReadLogsFromFile.json(this.logFilePath)
    } else {
      logs = ReadLogsFromFile.nonJson(this.logFilePath)
    }

    if (logs.length) {
      try {
        const encryptedData = encrypt(
          JSON.stringify(logs),
          config.encryptionKey
        )

        const response = await SyncLogsToCloud.post(
          encryptedData,
          config.apiKey,
          config.applicationKey
        )

        if (response) {
          // Clear the logs in the file.
          WriteLogToFile.clearFileContent(this.logFilePath)
        }
      } catch (error) {
        this.handleError(error)
      }
    }
  }

  /**
   * @description Registers a global error handler for the library. This handler will be called with any errors that occur, allowing users to customize error handling.
   * @param handler A callback function that will be invoked with the error object when an error occurs.
   */
  public registerGlobalErrorHandler(handler: (error: any) => void): void {
    GlobalErrorHandler.registerGlobalErrorHandler(handler);
  }
}

export default ConsoleWatcher
