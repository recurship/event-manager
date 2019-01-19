let defaultExport;
if (process.env.NODE_ENV === 'production') {
  defaultExport = require('./Root.prod').default;
} else {
  defaultExport = require('./Root.dev').default;
}
export default defaultExport;
