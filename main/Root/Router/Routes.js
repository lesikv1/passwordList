import _ from 'lodash'
import React, { Fragment } from 'react'
import { Route } from 'react-router-native'
import { Dimensions, Platform, View } from 'react-native'
import { subscribe, subLocal, $root } from 'startupjs'
import Stack from 'react-router-native-stack'
import Layout from '../../Layout'

const DEFAULT_ANIMATE = false // Platform.OS !== 'web'
@subscribe(props => ({
  myUserId: subLocal('_session.userId')
}))
export default class Routes extends React.Component {
  state = {
    orientation: getOrientation()
  }

  constructor (...args) {
    super(...args)
    // For android/iOS do force rerender when the screen orientation change
    Platform.OS !== 'web' &&
      Dimensions.addEventListener('change', this.orientationChangeHandler)
  }
  componentWillUnmount () {
    Platform.OS !== 'web' &&
      Dimensions.removeEventListener('change', this.orientationChangeHandler)
  }

  componentDidMount () {
    this.setLastActivity()
  }

  componentDidUpdate (prevProps, prevState) {
    this.setLastActivity()
  }

  orientationChangeHandler = () => {
    let { orientation } = this.state
    let newOrientation = getOrientation()
    if (orientation !== newOrientation) {
      this.setState({ orientation: newOrientation })
    }
  }

  setLastActivity = async () => {
    const { myUserId } = this.props.scope
    if (!myUserId) return
    await $root.scope(`users.${myUserId}.lastVisitedAt`).set(Date.now())
  }

  isProfile = path => path.includes('/profile')

  render () {
    let { routes, animate = DEFAULT_ANIMATE } = this.props
    let { orientation } = this.state
    let routeComponents = routes.map((route, i) => {
      return (
        <Route
          key={i}
          {..._.omit(route, ['component', 'routes'])}
          render={props => (
            <Fragment>
              <Layout
                hideHeader={route.hideHeader}
                showEditButton={this.isProfile(route.path)}
                showAddButton={this.isProfile(route.path)}
                contentSize={route.contentSize}
                routePath={route.path}
                isStaticHeader={route.isStaticHeader}
                isStaticFooter={route.isStaticFooter}
              >
                <View key={orientation} style={{ flex: 1 }}>
                  <route.component
                    {...props}
                    action={route.action}
                    routes={route.routes}
                  />
                </View>
              </Layout>
            </Fragment>
          )}
        />
      )
    })
    if (animate) {
      return (
        <Stack gestureEnabled={false} animationType='slide-horizontal'>
          {routeComponents}
        </Stack>
      )
    } else {
      return <Fragment>{routeComponents}</Fragment>
    }
  }
}

function getOrientation () {
  let dim = Dimensions.get('screen')
  return dim.width >= dim.height ? 'landscape' : 'portrait'
}
