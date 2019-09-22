import React from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native'
import {
  observer,
} from 'startupjs'
import axios from 'axios'

import './index.styl'
export default observer(function Card ({card, openEdit, onDelete}) {

  return pug`
    View.root
      View.info
        Text.text='Name Service: ' + card.name
        Text.text='Password: ' + card.password
        Text.text='How Recovery Password: ' + card.recovery
        Text.text='Password Recovery Word: ' + card.word
      View.buttons
        TouchableOpacity.btn(onPress=() => onDelete(card.id))
          Text.delete Delete
        TouchableOpacity.btn(onPress=() => openEdit(card))
          Text.edit Edit
  `
})
