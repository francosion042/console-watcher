import * as fs from 'fs'

class ReadLogsFromFile {
  public nonJson(filePath: string): object[] {
    try {
      let fileContent
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return []
      } else {
        fileContent = fs.readFileSync(filePath, 'utf8')
      }

      // Split the file content by newline to get individual JSON strings
      const jsonStrings = fileContent
        .split('\n')
        .filter((str) => str.trim() !== '')
      const jsonObjects = jsonStrings.map((str) => JSON.parse(str))

      return jsonObjects
    } catch (error) {
      return []
    }
  }

  public json(filePath: string): object[] {
    try {
      let fileContent
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return []
      } else {
        fileContent = fs.readFileSync(filePath, 'utf8')
      }
      const parsedData = JSON.parse(fileContent)
      if (Array.isArray(parsedData)) {
        return parsedData
      } else if (typeof parsedData === 'object') {
        return [parsedData]
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
}

export default new ReadLogsFromFile()
