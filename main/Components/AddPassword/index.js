// import { BASE_URL } from '@env'
// import init from 'startupjs/init'
// import orm from './model'
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
import axios from 'axios'

import './index.styl'
export default observer(function AddPssword ({onPress}) {

  return pug`
    TouchableOpacity.root(onPress=onPress)
      Text.text Add pssword for servece
  `
})
