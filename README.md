# console-watcher

[![Publish Package to npmjs](https://github.com/francosion042/console-watcher/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/francosion042/console-watcher/actions/workflows/npm-publish.yml)

---

`console-watcher` is a utility library designed to monitor and handle console outputs in a Node.js environment. By using `console-watcher`, developers can easily save console logs, errors, and info messages to a .log, .txt or .json file while retaining the ability to display them in the console.

## Features

- Override native console logging methods (`console.log`, `console.info`, `console.error`).
- Provides options to save logs to a file or display them in the console.
- Configurable log file path.
- Supports both JSON and non-JSON file types for logging.

## Installation

```bash
npm install console-watcher
```

## Usage

To use `console-watcher`, first import the class in your app's entry file and create a new instance.

```typescript

import ConsoleWatcher from 'console-watcher'

new ConsoleWatcher(config)
```

## Configuration

When initializing `console-watcher`, you can pass in a configuration object with the following properties:

- `printInConsole`: Determines if the log should be displayed in the console. Default is `true`.
- `saveToFile`: Determines if the log should be saved to a file. Default is `true`.
- `logFilePath`: Specifies the path of the log file. The utility checks for the file type to determine if it's JSON or non-JSON. Default file path is `console-watcher.log`.

```typescript
const config = {
  printInConsole: true,
  saveToFile: true,
  logFilePath: 'consoleWatcher.json'
}
```

## Contributing

-_Coming soon_

## License

MIT

---

This README provides a basic introduction and guide to using the `console-watcher` utility. Additional sections, such as a more detailed installation guide, examples, and information about dependencies, can be added as required.
