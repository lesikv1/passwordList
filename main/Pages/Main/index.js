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
  $root,
  useQuery
} from 'startupjs'
import { AddPassword, AddingPassword } from 'main/Components'
import axios from 'axios'

import './index.styl'

export default observer(function Main () {
  let [visible, setVisible] = useState(false)
  let [cards, $cards] = useQuery('cards', {})

  const save = (data) => {
    $cards.addSelf(data)
  }

  console.log(visible)

  const web = pug`
    View.button
      AddPassword.button(onPress=() => setVisible(true))
    if visible
      AddingPassword(onClose=() => setVisible(false) onSave=(data) => save(data))
  `
  const mobile = pug`
    unless visible
      View.button
        AddPassword.button(onPress=() => setVisible(true))
    if visible
      AddingPassword(onClose=() => setVisible(false) onSave=(data) => save(data))
  `

  return pug`
    ScrollView.root
      if Platform.OS === 'web'
        = web
      else 
        = mobile
  `
})
