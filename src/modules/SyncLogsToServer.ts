import axios from 'axios'
import GlobalErrorHandler from '../errors/GlobalErrorHandler'

class SyncLogsToServer extends GlobalErrorHandler {
  constructor() {
    super()
  }
  public async post(
    data: string,
    apiKey: string,
    appKey: string
  ): Promise<boolean> {
    const apiUrl: string = `https://api.consolewatcher.dev/api/v1/applications/${appKey}/logs`
    const headers = {
      'api-key': apiKey,
      'Content-Type': 'text/plain',
      'Content-Length': data.length.toString(),
    }
    try {
      const response = await axios.post(apiUrl, data, {
        headers,
      })

      if (response.status === 201) {
        return true
      } else {
        this.handleError(response)
        return false
      }
    } catch (error) {
      this.handleError(error)
      return false
    }
  }
}

export default new SyncLogsToServer()
