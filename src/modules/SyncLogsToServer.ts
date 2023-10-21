import { request } from 'https'

class SyncLogsToServer {
  private apiUrl: URL = new URL('https://api-endpoint.com/logs')

  public post(data: string, apiKey: string, appId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        hostname: this.apiUrl.hostname,
        path: this.apiUrl.pathname,
        headers: {
          'Api-Key': apiKey,
          'Application-Id': appId,
          'Content-Type': 'text/plain',
          'Content-Length': data.length,
        },
      }

      const req = request(options, (res) => {
        let responseData = ''
        res.on('data', (chunk) => {
          responseData += chunk
        })
        res.on('end', () => {
          resolve(responseData)
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.write(data)
      req.end()
    })
  }
}

export default new SyncLogsToServer()
