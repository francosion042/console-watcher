import fs from 'fs'
import { ConfigType } from './types'

class ConsoleWatcher {
  private nativeConsoleLog: (...args: any[]) => void
  private saveToFile: boolean
  private logFilePath: string


  constructor(config: ConfigType) {
    // Stores the native console.log function in a variable.
    this.nativeConsoleLog = console.log
    this.saveToFile = config.saveToFile || false
    this.logFilePath = config.logFilePath || 'consologWatcher.log'
    this.overrideConsoleLog()
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

      this.nativeConsoleLog(...args)
    }
  }

  private saveLogToFile(logData: string): void {
    fs.appendFileSync(this.logFilePath, logData + '\n')
  }
}

export default ConsoleWatcher

