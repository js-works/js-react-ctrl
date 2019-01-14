'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/js-react-ctrl.cjs.production.js')
} else {
  module.exports = require('./dist/js-react-ctrl.cjs.development.js')
}
