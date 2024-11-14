import * as React from 'react'
import NavigationStack, { StackConfig } from '../components/NavigationStack'
import ChatScreen from '../../screens/ChatScreen'

export type ChatStackParamList = {
  Chat: undefined
}

const config: StackConfig<keyof ChatStackParamList> = {
  initialRouteName: 'Chat',
  screens: {
    Chat: {
      title: 'chat',
      component: ChatScreen,
    },
  },
}

const ChatStack = () => <NavigationStack config={config} />

export default ChatStack
