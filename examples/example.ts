import ConsoleWatcher from '../src/ConsoleWatcher'

const consoleWatcherConfig = {
  printInConsole: true, // Optional - defaults to true
  saveToFile: true, // Optional - defaults to true
  logFilePath: 'consoleWatcher.json', // Optional - accepts ['.log', '.txt', '.json'] files - defaults to 'consoleWatcher.log'
}
const consoleWatcher = new ConsoleWatcher(consoleWatcherConfig) // You can pass the optional config

// Handle Errors
consoleWatcher.registerGlobalErrorHandler((error) => {
  console.warn(error?.response?.statusText ?? error.message ?? 'Unknown')
  // console.warn(error)
})


// You can Periodically sync the logs to the remote cloud.
const syncToCloudConfig = {
  apiKey: 'API_KEY_85SXZ11697914013841',
  applicationKey: 'APP_KEY_BOUXCY1697914182124',
  encryptionKey: 'gggggggggggggggg',
}
consoleWatcher.syncToConsoleWatcherCloud(syncToCloudConfig)

console.log('This is a test log!', 'Another test log')
console.info({ hello: 'world' })
console.error([1, 2, 3, 4, 5])
console.log()
