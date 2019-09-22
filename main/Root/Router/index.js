import React, { Fragment } from 'react'
import RouterComponent from './RouterComponent'
import { Platform } from 'react-native'
import Routes from './Routes'
import { model, subscribe, subLocal, subDoc } from 'startupjs'
import getRoutes from '../../routes'
import * as pages from '../../Pages'
// import Auth from '../../pages/Auth'
// import { axios } from 'clientHelpers'
import { BackButton } from 'react-router-native'

const routes = getRoutes(pages)

@subscribe(() => ({
  userId: subLocal('_session.userId'),
  user: subDoc('users', model.get('_session.userId')),
  loggedIn: subLocal('_session.loggedIn')
}))
export default class Router extends React.Component {
  constructor (...args) {
    super(...args)
    let { userId, loggedIn } = this.props.scope
    model.ref('_session.user', `users.${userId}`)
    this.state = {
      loggedIn
    }
  }

  render () {
    let { loggedIn } = this.state
    let { user, userId } = this.props.scope

    const isAuth = loggedIn && !user.removed

    return (
      <RouterComponent>
        <Fragment>
          {Platform.OS !== 'web' && <BackButton />}
          <Routes routes={routes} />
          {/* {isAuth ? <Routes routes={routes} /> : <Auth />} */}
        </Fragment>
      </RouterComponent>
    )
  }
}
