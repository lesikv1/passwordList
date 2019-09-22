import React from 'react'
import Root from './Root'
// import Auth from '../main/Auth'
// import NoConnectionScreen from './components/NoConnectionScreen'
// const model = require('react-sharedb').model

console.log('>>>>> NATIVE APP')
console.disableYellowBox = true

export default class App extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      loggedIn: false,
      authenticated: false,
      error: false
    }
  }
  onFinish = (data = {}) => {
    this.setState({
      authenticated: true,
      userId: data.userId,
      loggedIn: data.loggedIn
    })
  }

  onError = () => {
    this.setState({ error: true })
  }

  render () {
    let { userId, loggedIn, authenticated, error } = this.state

    // return error ? (
    //   <NoConnectionScreen />
    // ) : authenticated ? (
    //   <Root serverSession={{ userId, loggedIn }} />
    // ) : (
    //   <Auth onError={this.onError} onFinish={this.onFinish} />
    // )

    return (
      <Root serverSession={{ userId, loggedIn }} />
    )
  }
}
