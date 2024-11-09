import * as React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { ScreenComponent } from '../../navigation/RootNavigator'

import { getRandomNumber } from '../../services/utils'
import { useSelector } from '../../redux/useSelector'
import { currentLocaleSelector } from '../../redux/selectors'
import { Locale } from '../../resources/translations'
import { ChatMessage, ChatOption } from '../../types/chat'
import { chatFlowByLocale, initialChatStepId } from '../../optional/chat'
import { usePrevious } from '../../hooks/usePrevious'
import { useChatActions } from '../../resources/translations/chat'
import { Message, OptionButton, TypingMessage } from './ChatMessages'

const ChatScreen: ScreenComponent<'Chat'> = ({ navigation }) => {
  const locale = useSelector(currentLocaleSelector) as Locale
  const flow = chatFlowByLocale?.[locale]
  const chatActions = useChatActions(navigation)

  const [stepId, setStepId] = React.useState('')
  const previousStepId = usePrevious(stepId)

  const [history, setHistory] = React.useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = React.useState(true)

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const scrollViewRef = React.useRef<ScrollView | null>(null)
  const onContentSizeChange = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }

  const options = flow?.[stepId]?.options ?? []

  // ========== Send 1 outgoing message ========== //
  const sendMessage = (message: ChatMessage) => {
    setHistory((current) => [...current, message])
  }

  // ========== Send incoming messages ========== //
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

  // ========== On Change Step ========== //
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

  // ========== Option Press ========== //
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
})
