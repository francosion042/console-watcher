import * as fs from 'fs'

// Class responsible for appending data to JSON, text and log files.
class WriteLogToFile {
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
      } catch (e) {
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
}

export default new WriteLogToFile()
