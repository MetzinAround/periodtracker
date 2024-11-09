import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { TypingIndicator } from './TypingIndicator'
import { useColor } from '../../hooks/useColor'
import { Text } from '../../components/Text'
import { globalStyles } from '../../config/theme'
import { ChatMessage } from '../../types/chat'

export const Message = ({ message, type }: ChatMessage) => {
  const { palette } = useColor()
  const style = type === 'sent' ? styles.sentMessage : styles.receivedMessage
  const backgroundColor = type === 'sent' ? palette.primary.base : palette.basic.base

  return (
    <View style={[style, globalStyles.shadow, { backgroundColor }]}>
      <Text enableTranslate={false}>{message}</Text>
    </View>
  )
}

export const TypingMessage = ({ visible }: { visible: boolean }) => {
  const { palette } = useColor()

  if (!visible) {
    return null
  }

  return (
    <View
      style={[styles.receivedMessage, globalStyles.shadow, { backgroundColor: palette.basic.base }]}
    >
      <TypingIndicator />
    </View>
  )
}

export const OptionButton = ({
  label,
  onPress,
  hidden,
}: {
  label: string
  onPress: () => void
  hidden: boolean
}) => {
  const { palette } = useColor()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.option,
        globalStyles.shadow,
        { backgroundColor: palette.secondary.base },
        hidden && styles.hidden,
      ]}
    >
      <Text enableTranslate={false}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 12,
  },
  scrollView: {
    marginBottom: 'auto',
    height: '100%',
  },
  sentMessage: {
    borderRadius: 20,
    marginBottom: 8,
    padding: 12,
    minWidth: 120,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    borderRadius: 20,
    marginBottom: 8,
    padding: 12,
    minWidth: 120,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  option: {
    borderRadius: 20,
    marginBottom: 8,
    padding: 12,
    width: '100%',
  },
  hidden: {
    opacity: 0,
  },
})
