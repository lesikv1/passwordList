import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Linking,
  ScrollView,
  Animated,
  Platform
} from 'react-native'
import {
  observer,
  useLocal,
  model,
  useLocalDoc,
  useSession
} from 'startupjs'
import Header from './Header'
import './index.styl'

const sizes = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: '100%'
}

export default observer(function Layout ({
  children,
  hideHeader,
  contentSize = 'desktop',
  ...props
}) {
  let contentStyle = { maxWidth: sizes[contentSize] }
  let [loggedIn] = useSession('loggedIn')
  let [userId] = useSession('userId')

  let [user, $user] = useLocalDoc(`users`, userId)

  return pug`
    View.root
      View.content(style=contentStyle)
        Header
        View.overflow
          =children
  `
})
