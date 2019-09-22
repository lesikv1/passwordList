import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native'
import {
  observer,
  useDoc,
  useApi,
  $root
} from 'startupjs'
import { AddPassword, AddingPassword } from 'main/Components'
import axios from 'axios'

import './index.styl'

export default observer(function Main () {
  let [visible, setVisible] = useState(false)

  const web = pug`
    View.button
      AddPassword.button(onPress=() => setVisible(true))
    if visible
      AddingPassword(onClose=() => setVisible(false))
  `
  const mobile = pug`
    unless visible
      View.button
        AddPassword.button(onPress=() => setVisible(true))
    if visible
      AddingPassword(onClose=() => setVisible(false))
  `

  return pug`
    ScrollView.root
      if Platform.OS === 'web'
        = web
      else 
        = mobile
  `
})
