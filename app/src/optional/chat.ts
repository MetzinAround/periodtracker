/* eslint-disable @typescript-eslint/no-var-requires */
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ChatActionMap, ChatFlowByLocale, ChatTranslations } from '../types/chat'
import { GlobalParamList } from '../navigation/RootNavigator'

let initialChatStepId = ''
let chatFlowByLocale: ChatFlowByLocale | undefined
let chatTranslations: ChatTranslations | object = {}
let useChatActions: (
  navigation: NativeStackNavigationProp<GlobalParamList, 'Chat', undefined>,
) => Partial<ChatActionMap> = () => ({})
let CHAT_ENABLED = false

try {
  const chat = require('../resources/features/chat')
  initialChatStepId = chat.initialChatStepId
  chatFlowByLocale = chat.chatFlowByLocale
  chatTranslations = chat.chatTranslations
  useChatActions = chat.useChatActions
  CHAT_ENABLED = true
} catch (e) {
  //
}

export { CHAT_ENABLED, chatFlowByLocale, initialChatStepId, chatTranslations, useChatActions }
