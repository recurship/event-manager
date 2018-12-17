let defaultExport;
if (process.env.NODE_ENV === 'production') {
  defaultExport = require('./configureStore.prod').default;
} else {
  defaultExport = require('./configureStore.dev').default;
}
export default defaultExport;
