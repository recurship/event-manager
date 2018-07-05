// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from '../DevTools'
import { Route } from 'react-router-dom'
import App from '../App/App'

const Root = ({ store }: any) => (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
