import React, { useState }  from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native'
import {
  observer,
  useDoc,
  useApi,
  $root
} from 'startupjs'
import { Modal } from 'components'
import axios from 'axios'

import './index.styl'
export default observer(function EditPassword ({onClose, saveEdit, card}) {
  let [name, setName] = useState(card.name || '')
  let [password, setPassword] = useState(card.password || '')
  let [recovery, setRecovery] = useState(card.recovery || '')
  let [word, setWord] = useState(card.word || '')

  const save = () => {
    saveEdit({
      name,
      password,
      recovery,
      word
    })
    onClose()
  }

  return pug`
    View.root
      View.content
        Text.text Name Service
        TextInput.input(
          value=name
          onChangeText=t => setName(t)
        )
        Text.text Password
        TextInput.input(
          value=password
          onChangeText=t => setPassword(t)
        )
        Text.text How Recovery Password
        TextInput.input(
          value=recovery
          onChangeText=t => setRecovery(t)
        )
        Text.text Password Recovery Word
        TextInput.input(
          value=word
          onChangeText=t => setWord(t)
        )
        View.buttons
          Button(
            title='Cancel'
            onPress=onClose
          )
          Button(
            title='Edit'
            onPress=() => save()
          )
          
  `
})
