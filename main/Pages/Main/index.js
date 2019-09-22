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
import { AddPassword, AddingPassword, Card } from 'main/Components'
import axios from 'axios'

import './index.styl'

export default observer(function Main () {
  let [visible, setVisible] = useState(false)
  let [cards, $cards] = useQuery('cards', {})
  if (!cards) return null

  let [card, setCard] = useState({})

  const save = (data) => {
    $cards.addSelf(data)
  }

  const onClose = () => {
    setVisible(false)
    setCard(null)
  }

  const del = async (id) => {
    let $card = await $cards.at(id)
    $card.delAsync()
  }

  const web = pug`
    View.content
      AddPassword(onPress=() => setVisible(true))
      for card in cards
        Card(card=card onDelete=id => del(id) openEdit=(item) => openEdit(item))

    if visible
      AddingPassword(onClose=() => onClose() onSave=(data) => save(data))
  `
  const mobile = pug`
    unless visible
      View.content
        AddPassword(onPress=() => setVisible(true))
        for card in cards.filter(Boolean)
          Card(card=card onDelete=id => del(id))
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
