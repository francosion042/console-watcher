import axios from 'axios'

class SyncLogsToServer {
  public async post(
    data: string,
    apiKey: string,
    appKey: string
  ): Promise<boolean> {
    const apiUrl: string = `http://127.0.0.1:3333/api/v1/applications/${appKey}/logs`
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
        return false
      }
    } catch (error) {
      return false
    }
  }
}

export default new SyncLogsToServer()
