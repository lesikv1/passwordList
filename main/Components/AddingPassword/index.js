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
export default observer(function AddPssword ({onClose}) {

  let [password, setPassword] = useState('')

  return pug`
    View.root
      View.content
        Text.text Name Service
        TextInput.input(
          value=password
          onChangeText=t => setPassword(t)
        )
        Text.text Password
        TextInput.input(
          value=password
          onChangeText=t => setPassword(t)
        )
        Text.text How Recovery Password
        TextInput.input(
          value=password
          onChangeText=t => setPassword(t)
        )
        Text.text Password Recovery Word
        TextInput.input(
          value=password
          onChangeText=t => setPassword(t)
        )
        View.buttons
          Button(
            title='Cancel'
            onPress=onClose
          )
          Button(
            title='Add'
            onPress=onClose
          )
          
  `
})
