import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { observer } from 'startupjs'

const SIZES = {
  xs: 14,
  s: 18,
  m: 20,
  l: 30,
  xl: 40,
  xxl: 60
}

export default observer(
  ({
    name,
    size = 'm',
    color,
    style,
    type,
    ...props
  }: {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
  }) => (
    <FontAwesomeIcon
      icon={type ? [type, name] : name}
      size={typeof size === 'number' ? size : SIZES[size]}
      style={style}
      color={color}
      {...props}
    />
  )
)
