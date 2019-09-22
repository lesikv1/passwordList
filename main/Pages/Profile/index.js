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

export default observer(function Layout () {
  return pug`
    Text Profile
  `
})
