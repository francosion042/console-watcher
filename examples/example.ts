import ConsoleWatcher from '../src/index'

const config = {
  printInConsole: true, // Optional - defaults to true
  saveToFile: true, // Optional - defaults to true
  logFilePath: 'consoleWatcher.json', // Optional - accepts ['.log', '.txt', '.json'] files - defaults to 'consoleWatcher.log'
}
new ConsoleWatcher(config) // You can pass the optional config

console.log('This is a test log!', 'Another test log')
console.info({ hello: 'world' })
console.error([1, 2, 3, 4, 5])
console.log()
