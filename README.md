# console-watcher

<!-- markdownlint-disable MD029 -->
<!-- markdownlint-disable MD033 -->
<div align="center">

[![Publish Package to npmjs](https://github.com/francosion042/console-watcher/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/francosion042/console-watcher/actions/workflows/npm-publish.yml)   [![npm version](https://img.shields.io/npm/v/console-watcher.svg?style=flat-square)](https://www.npmjs.org/package/console-watcher)   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)    [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)    [![Downloads](https://img.shields.io/npm/dm/console-watcher.svg)](https://www.npmjs.com/package/console-watcher)

</div>
---

`console-watcher` is a utility library that provides extended logging capabilities for Node.js applications. It overrides the native console methods, allowing developers to customize how logs are handled. Logs can be saved to a file, or even synced to a dedicated cloud while retaining the ability to display or hide them in the console for security reasons.

## Features

- Override native console logging methods (`console.log`, `console.info`, `console.error`).
- Configurable behavior to print in console or save to a file.
- Supports both JSON and non-JSON file types for logs saving.
- Encrypt and sync logs to a dedicated cloud for better visualization and management.
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

## Syncing to ConsoleWatcher Cloud

ConsoleWatcher provides the flexibility to sync your logs to a dedicated cloud, either manually or at regular intervals. This feature enhances log visualization and management.

To manually sync logs:

```typescript
watcher.syncToConsoleWatcherCloud({
  apiKey: 'YOUR_API_KEY',
  applicationKey: 'YOUR_APPLICATION_KEY',
  encryptionKey: 'YOUR_ENCRYPTION_KEY'
});
```

For automated intervals, you can set up a routine using JavaScript's `setInterval`:

```typescript
setInterval(() => {
  watcher.syncToConsoleWatcherCloud({
    apiKey: 'YOUR_API_KEY',
    applicationKey: 'YOUR_APPLICATION_KEY',
    encryptionKey: 'YOUR_ENCRYPTION_KEY'
  });
}, YOUR_DESIRED_INTERVAL_IN_MILLISECONDS);
```

Replace `YOUR_DESIRED_INTERVAL_IN_MILLISECONDS` with the frequency you want the sync operation to occur (e.g., `60000` for every minute). Adjust as needed to suit your application's requirements.

Sync Configuration:

- `apiKey`: Your dedicated API key for the ConsoleWatcher platform.
- `applicationKey`: Your application’s unique key on the ConsoleWatcher platform.
- `encryptionKey`: A private key unique to you. Ensure you keep this key safe and don’t lose it to prevent data loss. This key must be exactly 16 characters in length.

Note: The encryption key is used to encrypt logs before they’re sent to the cloud. This ensures data privacy and security. It’s vital not to lose or change this key to avoid losing already encrypted data.

## Contributing

First and foremost, thank you for your interest in contributing to ConsoleWatcher! Open source projects like this thrive because of contributors like you. Here's how you can help:

### Getting Started

1. **Fork the Repository**: Start by forking the console-watcher repository to your own GitHub account.

2. **Clone the Repository**: Once you have forked the repo, clone it to your local machine:

   ```bash
   git clone https://github.com/YOUR_USERNAME/console-watcher.git
   ```

3. **Install Dependencies**: After cloning, navigate to the project directory and install the necessary dependencies:

   ```bash
   cd console-watcher
   npm install
   ```

### Making Changes

4. **Create a New Branch**: Always create a new branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make Your Changes**: Implement your feature or bug fix.

6. **Run Tests**: Ensure that your changes do not break any existing functionality. Add new tests if necessary.

7. **Commit Your Changes**: Once you're satisfied with your changes, stage and commit them:

   ```bash
   git add .
   git commit -m "Add some feature or fix some bug"
   ```

8. **Push to Your Fork**: Push your changes to your forked repository:

   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting a Pull Request

9. **Open a Pull Request**: Navigate to the ConsoleWatcher repository and click on "Pull Requests". Click the "New Pull Request" button and select your fork and branch.

10. **Describe Your Changes**: In the pull request description, explain your changes, why you made them, and any additional context if necessary.

11. **Wait for Review**: The maintainers will review your pull request, provide feedback, and merge it once it's approved.

### Additional Notes

- **Respect the Code of Conduct**: Please ensure that you follow the project's code of conduct in all interactions.

- **Ask for Help**: If you're stuck or unsure about something, don't hesitate to ask for help. The community is here to assist.

- **Stay Updated**: Make sure to pull the latest changes from the `master` branch before creating a new pull request.

Thank you for your contribution! Your efforts help make ConsoleWatcher better for everyone.

## License

MIT

---

This README provides a basic introduction and guide to using the `console-watcher` utility. Additional sections, such as a more detailed installation guide, examples, and information about dependencies, can be added as required.
