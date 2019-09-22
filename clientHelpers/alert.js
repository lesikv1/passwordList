import { Alert } from 'react-native'

export default async text => {
  return new Promise(resolve => {
    Alert.alert(text, '', [{ text: 'OK', onPress: () => resolve(true) }], {
      cancelable: false
    })
  })
}
