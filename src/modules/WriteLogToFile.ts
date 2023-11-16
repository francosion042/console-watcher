import * as fs from 'fs'
import GlobalErrorHandler from '../errors/GlobalErrorHandler'

// Class responsible for appending data to JSON, text and log files.
class WriteLogToFile extends GlobalErrorHandler {
  constructor() {
    super()
  }
  public appendToNonJSONFile(filePath: string, obj: object) {
    const logData = JSON.stringify(obj)
    fs.appendFileSync(filePath, logData + '\n')
  }

  // Append an object to the target JSON file.
  public appendToJSONFile(filePath: string, obj: object): void {
    let fileContent

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      fileContent = '[]'
    } else {
      fileContent = fs.readFileSync(filePath, 'utf8')

      // If the file is empty or invalid JSON, initialize an empty array
      try {
        JSON.parse(fileContent)
      } catch (error) {
        this.handleError(error)
        fileContent = '[]'
      }
    }

    // Parse the file content
    const data = JSON.parse(fileContent)

    // Append the object
    data.push(obj)

    // Write the updated content back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  }

  public clearFileContent(filePath: string): void {
    try {
      // Check if the file exists before trying to clear its content
      if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8')
      }
    } catch (error) {
      this.handleError(error)
    }
  }
}

export default new WriteLogToFile()
