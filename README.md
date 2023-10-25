# console-watcher

<div align="center" style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-between;">

[![Publish Package to npmjs](https://github.com/francosion042/console-watcher/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/francosion042/console-watcher/actions/workflows/npm-publish.yml)

[![npm version](https://img.shields.io/npm/v/console-watcher.svg?style=flat-square)](https://www.npmjs.org/package/console-watcher)

[![Node.js Version Compatibility](https://img.shields.io/node/v/console-watcher)](https://www.npmjs.org/package/console-watcher)

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/console-watcher?style=flat-square)](https://bundlephobia.com/package/console-watcher@latest)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Downloads](https://img.shields.io/npm/dm/console-watcher.svg)](https://www.npmjs.com/package/console-watcher)

</div>
---

`console-watcher` is a utility library that provides extended logging capabilities for Node.js applications. It overrides the native console methods, allowing developers to customize how logs are handled. Logs can be saved to a file, or even synced to a dedicated server while retaining the ability to display or hide them in the console for security reasons.

## Features

- Override native console logging methods (`console.log`, `console.info`, `console.error`).
- Configurable behavior to print in console or save to a file.
- Supports both JSON and non-JSON file types for logs saving.
- Encrypt and sync logs to a dedicated server for better visualization and management.
- Register your custom error handling function which will be called whenever an error occurs within the library.

## Installation

```bash
npm install console-watcher
```

## Usage

To use `console-watcher`, first import the class in your app's entry file and create a new instance.

```typescript
import ConsoleWatcher from 'console-watcher'

const watcher = new ConsoleWatcher(config)
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
  logFilePath: 'consoleWatcher.json',
}
```

## Global Error Handling

Console Watcher supports a global error handler. You can register your custom error handling function which will be called whenever an error occurs within the library.

```typescript
watcher.registerGlobalErrorHandler((error) => {
  console.error('An error occurred in Console Watcher:', error.message ?? error?.response?.statusText ?? 'Unknown');
});
```

By registering a global error handler, you have the flexibility to handle errors in a way that best suits your application, whether it’s logging, alerting the user, or other custom behaviors.

## Syncing to ConsoleWatcher Server

ConsoleWatcher offers the ability to sync your logs to a dedicated server. This can be especially useful for easier log visualization and management.

```typescript
watcher.syncToConsoleWatcherServer({
  apiKey: 'YOUR_API_KEY',
  applicationKey: 'YOUR_APPLICATION_KEY',
  encryptionKey: 'YOUR_ENCRYPTION_KEY'
});
```

Sync Configuration:

- `apiKey`: Your dedicated API key for the ConsoleWatcher platform.
- `applicationKey`: Your application’s unique key on the ConsoleWatcher platform.
- `encryptionKey`: A private key unique to you. Ensure you keep this key safe and don’t lose it to prevent data loss. This key must be exactly 16 characters in length.

Note: The encryption key is used to encrypt logs before they’re sent to the server. This ensures data privacy and security. It’s vital not to lose or change this key to avoid losing already encrypted data.

## Contributing

-_Coming soon_

## License

MIT

---

This README provides a basic introduction and guide to using the `console-watcher` utility. Additional sections, such as a more detailed installation guide, examples, and information about dependencies, can be added as required.
