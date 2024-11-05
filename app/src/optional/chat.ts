/* eslint-disable @typescript-eslint/no-var-requires */
import { ChatFlowByLocale, ChatTranslations } from '../types/chat'

let initialChatStepId = ''
let chatFlowByLocale: ChatFlowByLocale | undefined
let chatTranslations: ChatTranslations | object = {}

try {
  const chat = require('../resources/translations/chat')
  initialChatStepId = chat.initialChatStepId
  chatFlowByLocale = chat.chatFlowByLocale
  chatTranslations = chat.chatTranslations
} catch (e) {
  //
}

export { chatFlowByLocale, initialChatStepId, chatTranslations }
