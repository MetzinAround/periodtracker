import * as React from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'
import { ScreenComponent } from '../../navigation/RootNavigator'
import { useColor } from '../../hooks/useColor'
import { Text } from '../../components/Text'
import { globalStyles } from '../../config/theme'
import { TypingIndicator } from './TypingIndicator'
import { getRandomNumber } from '../../services/utils'
import { useSelector } from '../../redux/useSelector'
import { currentLocaleSelector } from '../../redux/selectors'
import { Locale } from '../../resources/translations'
import { ChatMessage, ChatOption } from '../../types/chat'
import { chatFlowByLocale, initialChatStepId } from '../../optional/chat'
import { usePrevious } from '../../hooks/usePrevious'
import { useChatActions } from '../../resources/translations/chat'

const ChatScreen: ScreenComponent<'Chat'> = ({ navigation }) => {
  const locale = useSelector(currentLocaleSelector) as Locale
  const flow = chatFlowByLocale?.[locale]
  const chatActions = useChatActions(navigation)

  const [stepId, setStepId] = React.useState('')
  const previousStepId = usePrevious(stepId)

  const [history, setHistory] = React.useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = React.useState(true)

  const sendMessage = (message: ChatMessage) => {
    setHistory((current) => [...current, message])
  }

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const scrollViewRef = React.useRef<ScrollView | null>(null)
  const onContentSizeChange = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }

  const options = flow?.[stepId]?.options ?? []

  const sendMessagesRecursively = (messages: ChatMessage[], index = 0) => {
    if (!messages.length) {
      setIsTyping(false)
      return
    }

    const delay = getRandomNumber(MIN_DELAY, MAX_DELAY)

    timeoutRef.current = setTimeout(() => {
      sendMessage(messages[index])
      const nextIndex = index + 1
      if (nextIndex >= messages.length) {
        setIsTyping(false)
      } else {
        sendMessagesRecursively(messages, nextIndex)
      }
    }, delay)
  }

  React.useEffect(() => {
    setIsTyping(true)

    if (!flow || !initialChatStepId) {
      return
    }

    if (!stepId) {
      setStepId(initialChatStepId)
      return
    }

    if (!flow[stepId] && previousStepId) {
      setStepId(previousStepId)
      return
    }

    const messagesToSend: ChatMessage[] = flow[stepId].messages.map((item) => ({
      message: item,
      type: 'received',
    }))

    sendMessagesRecursively(messagesToSend)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [stepId])

  const getOnOptionPress = (option: ChatOption) => {
    if (option?.action) {
      return chatActions[option?.action]
    }

    const next = option.nextStepId
    if (!next) {
      return () => {
        //
      }
    }

    return () => {
      setIsTyping(true)
      sendMessage({ message: option.label, type: 'sent' })
      setStepId(next)
    }
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        onContentSizeChange={onContentSizeChange}
      >
        {history.map((message, i) => (
          <Message key={`message${i}`} message={message.message} type={message.type} />
        ))}

        <TypingMessage visible={isTyping} />
      </ScrollView>

      {options.map((option) => (
        <OptionButton
          key={`${stepId}${option.label}`}
          onPress={getOnOptionPress(option)}
          label={option.label}
          hidden={isTyping}
        />
      ))}
    </View>
  )
}

export default ChatScreen

const Message = ({ message, type }: ChatMessage) => {
  const { palette } = useColor()
  const style = type === 'sent' ? styles.sentMessage : styles.receivedMessage
  const backgroundColor = type === 'sent' ? palette.primary.base : palette.basic.base

  return (
    <View style={[style, globalStyles.shadow, { backgroundColor }]}>
      <Text enableTranslate={false}>{message}</Text>
    </View>
  )
}

const TypingMessage = ({ visible }: { visible: boolean }) => {
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

const OptionButton = ({
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

const MIN_DELAY = 500
const MAX_DELAY = 2000

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
