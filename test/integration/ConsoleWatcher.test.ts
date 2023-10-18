import * as fs from 'fs'
import ConsoleWatcher from '../../src/index'

describe('ConsoleWatcher', () => {
  // Check if logs are saved to a file
  it('should save log to file', () => {
    const watcher = new ConsoleWatcher({ logFilePath: './test-log.json' })
    console.log('Test log message')
    const fileContent = fs.readFileSync('./test-log.json', 'utf8')
    const logs = JSON.parse(fileContent)
    expect(logs).toContainEqual(
      expect.objectContaining({
        messages: ['Test log message'],
        type: 'log',
      })
    )
  })

  // Check if logs are displayed in console
  it('should display logs in console', () => {
    const mockLog = jest.spyOn(console, 'log')
    const watcher = new ConsoleWatcher()
    console.log('Test log message')
    expect(mockLog).toHaveBeenCalledWith('Test log message')
    mockLog.mockRestore()
  })
})
