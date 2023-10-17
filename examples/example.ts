import ConsoleWatcher from '../src/index'

new ConsoleWatcher({ logFilePath: 'app.json' })

console.log('This is a test log!');
console.info({hello: 'world'})
console.error([1,2,3,4,5])