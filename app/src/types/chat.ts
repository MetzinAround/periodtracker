import { Locale } from '../resources/translations'
import { ChatAction } from '../resources/features/chat'

export interface ChatStep {
  messages: string[]
  options: ChatOption[]
}

export type ChatOption =
  | {
      label: string
      nextStepId: string
      action?: never
    }
  | {
      label: string
      nextStepId?: never
      action: ChatAction
    }

export type ChatActionMap = Record<ChatAction, () => void>

export interface ChatMessage {
  message: string
  type: 'sent' | 'received'
}

export type ChatTranslations = {
  chat: string
}

export type ChatFlow = Record<string, ChatStep>

export type ChatFlowByLocale = Record<Locale, ChatFlow>
