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
import { AddPassword, AddingPassword, Card, EditPassword } from 'main/Components'
import axios from 'axios'

import './index.styl'

export default observer(function Main () {
  let [cards, $cards] = useQuery('cards', {})
  if (!cards) return null

  let [card, setCard] = useState({})

  let [visible, setVisible] = useState(false)

  let [showEdit, setShowEdit] = useState(false)

  const save = async (data) => {
    await $cards.addSelf(data)
  }

  const del = async (id) => {
    let $card = await $cards.at(id)
    await $card.delAsync()
  }

  const openEdit = async (item) => {
    await setCard(item)
    setShowEdit(true)
  }

  const saveEdit = async (data) => {
    let $card = await $cards.at(card.id)
    await $card.setEach(data)
    setCard({})
    setShowEdit(false)
  }

  const web = pug`
    View.content
      AddPassword(onPress=() => setVisible(true))
      for card in cards.filter(Boolean)
        Card(card=card onDelete=id => del(id) openEdit=(item) => openEdit(item))

    if visible
      AddingPassword(onClose=() => setVisible(false) onSave=(data) => save(data))
    if showEdit
      EditPassword(onClose=() => setShowEdit(false) saveEdit=(data) => saveEdit(data) card=card)
  `
  const mobile = pug`
    unless visible
      View.content
        AddPassword(onPress=() => setVisible(true))
        for card in cards.filter(Boolean)
          Card(card=card onDelete=id => del(id) openEdit=(item) => openEdit(item))
    if visible
      AddingPassword(onClose=() => setVisible(false) onSave=(data) => save(data))
    if showEdit
      EditPassword(onClose=() => setShowEdit(false) saveEdit=(data) => saveEdit(data) card=card)
  `

  return pug`
    ScrollView.root
      if Platform.OS === 'web'
        = web
      else 
        = mobile
  `
})
