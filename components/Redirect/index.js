import React from 'react'
import { Redirect as RNRedirect } from 'react-router-native'

export default class Redirect extends React.Component {
  state = {}
  to = to => {
    this.setState({ to })
  }
  // Render only once when the `to` becomes non-null
  shouldComponentUpdate = (newProps, newState) =>
    !!(
      (newProps.to && this.props.to !== newProps.to) ||
      (newState.to && this.state.to !== newState.to)
    )
  render () {
    let { to, push = true, ...props } = this.props
    to = to || this.state.to
    if (!to) return null
    return <RNRedirect to={to} push={push} {...props} />
  }
}