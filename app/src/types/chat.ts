import { Locale } from '../resources/translations'

export interface ChatStep {
  messages: string[]
  options: ChatOption[]
}

export type ChatFlow = Record<string, ChatStep>

export type ChatFlowByLocale = Record<Locale, ChatFlow>

export interface ChatOption {
  label: string
  nextStepId: string
}

export interface ChatMessage {
  message: string
  type: 'sent' | 'received'
}

export type ChatTranslations = {
  chat: string
}
