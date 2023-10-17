import fs from 'fs'
import { ConfigType } from './types'
import { validateFileType } from './utils'

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

    this.printInConsole = config.printInConsole === undefined ? true : config.printInConsole
    this.saveToFile = config.saveToFile === undefined ? true : config.saveToFile
    this.logFilePath = config.logFilePath && validateFileType(config.logFilePath) || 'consoleWatcher.log'

    this.overrideConsoleLog()
    this.overrideConsoleInfo()
    this.overrideConsoleError()
  }

  private overrideConsoleLog(): void {
    console.log = (...args: any[]) => {
      args = args.map((arg) => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg)
        } else {
          return arg
        }
      })

      // Saves to file if enabled in the config.
      if (this.saveToFile) {
        this.saveLogToFile(args.join(' '))
      }

      if (this.printInConsole) {
        this.nativeConsoleLog(...args)
      }
    }
  }

  private overrideConsoleInfo(): void {
    console.info = (...args: any[]) => {
      args = args.map((arg) => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg)
        } else {
          return arg
        }
      })

      // Saves to file if enabled in the config.
      if (this.saveToFile) {
        this.saveLogToFile(args.join(' '))
      }

      if (this.printInConsole) {
        this.nativeConsoleInfo(...args)
      }
    }
  }

  private overrideConsoleError(): void {
    console.error = (...args: any[]) => {
      args = args.map((arg) => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg)
        } else {
          return arg
        }
      })

      // Saves to file if enabled in the config.
      if (this.saveToFile) {
        this.saveLogToFile(args.join(' '))
      }

      if (this.printInConsole) {
        this.nativeConsoleError(...args)
      }
    }
  }

  private saveLogToFile(logData: string): void {
    fs.appendFileSync(this.logFilePath, logData + '\n\n')
  }
}

export default ConsoleWatcher

