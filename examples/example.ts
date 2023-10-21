import ConsoleWatcher from '../src/index'

const consoleWatcherConfig = {
  printInConsole: true, // Optional - defaults to true
  saveToFile: true, // Optional - defaults to true
  logFilePath: 'consoleWatcher.json', // Optional - accepts ['.log', '.txt', '.json'] files - defaults to 'consoleWatcher.log'
}
const consoleWatcher = new ConsoleWatcher(consoleWatcherConfig) // You can pass the optional config

// You can Periodically sync the logs to the remote server.
const syncToServerConfig = {
  apiKey: '',
  applicationId: '',
  encryptionKey: '',
}
consoleWatcher.syncToConsoleWatcherServer(syncToServerConfig)

console.log('This is a test log!', 'Another test log')
console.info({ hello: 'world' })
console.error([1, 2, 3, 4, 5])
console.log()
