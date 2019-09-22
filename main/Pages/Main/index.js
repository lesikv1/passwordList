import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import {
  observer,
  useDoc,
  useApi,
  $root
} from 'startupjs'
import { AddPassword } from 'main/Components'
import axios from 'axios'

import './index.styl'

export default observer(function Main () {
  let [visible, setVisible] = useState(false)

  return pug`
    View.root
      AddPassword(onPress=() => setVisible(true))
  `
})
