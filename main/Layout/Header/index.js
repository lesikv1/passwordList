import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  Linking,
  ScrollView,
  Animated,
  Platform,
  TouchableOpacity
} from 'react-native'
import {
  observer,
} from 'startupjs'
import { Redirect } from 'components'
import './index.styl'


export default observer(function Layout ({
  children,
  hideHeader,
  contentSize = 'desktop',
  ...props
}) {
  let redirect = useRef()

  return pug`
    View.root
      TouchableOpacity(onPress=() => redirect.current.to('/'))
        Text.button Password List
      Text.button |
      TouchableOpacity(onPress=() => redirect.current.to('/profile'))
        Text.button Profile
    Redirect(ref=redirect)
  `
})
