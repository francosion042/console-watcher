import fs from 'fs'

// Stores the native console.log function in a variable.
const nativeConsoleLog = console.log

// Overrides the console.log function.
console.log = function () {
  // Converts arguments object to an array
  let args = Array.prototype.slice.call(arguments)

  args = args.map((arg) => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg)
    } else {
      return arg
    }
  })

  // Saves log data to file
  saveLogToFile(args.join(' '))

  // Call the native console.log function.
  nativeConsoleLog.apply(console, args)
}

function saveLogToFile(logData: string) {
  // Saves the log data to a file  using Node.js's fs module.
  fs.appendFileSync('app.log', logData + '\n')
}

// Test
console.log('This is a test log!')
console.log({ hello: 'world' })
console.log([1, 2, 3, 4, 5])
