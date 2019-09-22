import React, { useState, useRef, useLayoutEffect } from 'react'
import { View, TextInput as RNTextInput, Text, Platform } from 'react-native'
import './index.styl'
// import Icon from '../Icon'
import { c } from 'clientHelpers'
import { observer } from 'startupjs'

export default observer(TextInput)
function TextInput ({
  variant = 'outlined', // 'text' | 'pure'
  color = 'main', // 'description'
  size = 'l', // 's' | 'm' | 'l'
  label,
  placeholder,
  value = '',
  icon,
  iconColor,
  onChangeText,
  onSubmitEditing,
  onFocus,
  onBlur,
  nextRef,
  forwardedRef,
  error,
  multiline,
  reverse,
  style,
  className,
  children,
  description,
  required,
  uppercase,
  ...props
}) {
  let input = useRef()
  let [forceHeight, setForceHeight] = useState()
  let [focused, setFocused] = useState(false)

  let defaultProps = {
    placeholderTextColor: 'rgba(0,0,0,0.3)',
    underlineColorAndroid: 'transparent'
  }
  if (nextRef) {
    Object.assign(defaultProps, {
      returnKeyType: 'next',
      blurOnSubmit: false
    })
  }
  let variantProps = {}
  if (variant === 'light') {
    variantProps = {
      placeholderTextColor: 'rgba(255,255,255,0.3)',
      selectionColor: 'rgba(255,255,255,0.5)',
      underlineColorAndroid: 'transparent'
    }
  }

  let showLabel = !!value || label

  useLayoutEffect(() => {
    maybeUpdateHeight()
  }, [])

  function _onSubmitEditing () {
    let node = nextRef && nextRef.current
    if (!node) return
    node.focus()
  }

  function _onFocus () {
    setFocused(true)
  }

  function _onBlur () {
    setFocused(false)
  }

  // update height on web
  function _onChangeText () {
    maybeUpdateHeight()
  }

  function maybeUpdateHeight () {
    if (Platform.OS === 'web') {
      if (multiline && input.current && input.current._node) {
        setForceHeight(input.current._node.scrollHeight)
      }
    }
  }

  function renderInput (standalone) {
    return (
      <RNTextInput
        ref={input}
        styleName={c('input', variant, color, size, { focused, uppercase })}
        style={[
          standalone ? style : {},
          {
            width: '100%',
            height: forceHeight || 'auto'
          }
        ]}
        className={standalone ? className : ''}
        placeholder={placeholder}
        value={value}
        multiline={multiline}
        onSubmitEditing={(...args) => {
          onSubmitEditing && onSubmitEditing(...args)
          _onSubmitEditing()
        }}
        onBlur={(...args) => {
          _onBlur()
          onBlur && onBlur(...args)
        }}
        onFocus={(...args) => {
          _onFocus()
          onFocus && onFocus(...args)
        }}
        onChangeText={(...args) => {
          _onChangeText()
          onChangeText && onChangeText(...args)
        }}
        {...defaultProps}
        {...variantProps}
        {...props}
      />
    )
  }

  if (variant === 'pure') return renderInput(true)
  return (
    <View
      styleName={c('root', variant, { focused })}
      style={style}
      className={className}
    >
      <View styleName={c('message-wrapper', variant, { focused })}>
        {label !== false && (
          <Text styleName={c('label', variant, { focused })}>
            {showLabel ? label || placeholder : null}
            {
              required &&
              <>
                {showLabel ? <Text> </Text> : null }
                <Text styleName='required'>
                  *
                </Text>
              </>
            }
            {!showLabel && ' '}
          </Text>
        )}
        {error && (
          <Text
            styleName={c('error', variant, { focused })}
          >
            {error}
          </Text>
        )}
      </View>
      <View styleName={c('wrapper', variant, { reverse, error, focused })}>
        {renderInput()}
        {children}
      </View>
      { description &&
        <View styleName={c('description-wrapper', variant, { focused })}>
          <Text styleName={c('description', variant, { focused })}>
            {description}
          </Text>
        </View>
      }
    </View>
  )
}
