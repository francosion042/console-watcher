import ConsoleWatcher from '../src/index'

// const config = { 
//     printInConsole: false, // Optional - defaults to true
//     saveToFile: true, // Optional - defaults to true
//     logFilePath: 'app.txt' // Optional - accepts ['.log', '.txt', '.json'] files - defaults to 'consoleWatcher.log'
// }
new ConsoleWatcher() // You can pass the optional config

console.log('This is a test log!');
console.info({hello: 'world'})
console.error([1,2,3,4,5])