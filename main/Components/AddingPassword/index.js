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
export default observer(function AddPssword ({onClose, onSave}) {

  let [name, setName] = useState('')
  let [password, setPassword] = useState('')
  let [recovery, setRecovery] = useState('')
  let [word, setWord] = useState('')

  const save = () => {
    onSave({
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
            title='Add'
            onPress=() => save()
          )
          
  `
})
