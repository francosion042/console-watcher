import axios from 'axios'

class SyncLogsToServer {
  private apiUrl: string = 'http://127.0.0.1:3333/api/v1/logs'

  public async post(
    data: string,
    apiKey: string,
    appKey: string
  ): Promise<boolean> {
    const headers = {
      'api-Key': apiKey,
      'application-Key': appKey,
      'Content-Type': 'text/plain',
      'Content-Length': data.length.toString(),
    }
    try {
      const response = await axios.post(this.apiUrl, data, {
        headers,
      })

      if (response.status === 201) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }
}

export default new SyncLogsToServer()
