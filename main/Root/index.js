// import 'helpers/initShareDb'
// import 'helpers/initOrm'
import { BASE_URL } from '@env'
import init from 'startupjs/init'
import orm from '../../model'
import React from 'react'
import './index.styl'
import '../icons' // Initialize FontAwesome icons library
import { Platform, SafeAreaView } from 'react-native'
import { $root, subLocal, subscribe } from 'startupjs'
import { Provider as PaperProvider } from 'react-native-paper'
import Router from './Router'
// TODO: Remove in prod
window.model = $root
// TODO: Temporary. Enable warnings
console.disableYellowBox = true

init({ baseUrl: BASE_URL, orm })

@subscribe(() => ({
  session: subLocal('_session')
}))
export default class App extends React.Component {
  constructor (...args) {
    super(...args)
    let { $session, session, serverSession } = this.props
    $session.setEach(serverSession)
  }
  render () {
    return (
      <>
        <PaperProvider>
          <Wrapper>
            <Router />
          </Wrapper>
        </PaperProvider>
      </>
    )
  }
}

const Wrapper =
  Platform.OS === 'web'
    ? React.memo(({ children }) => <>{children}</>)
    : React.memo(({ children }) => (
        <SafeAreaView styleName='page' style={{ flex: 1 }}>
          {children}
        </SafeAreaView>
      ))
