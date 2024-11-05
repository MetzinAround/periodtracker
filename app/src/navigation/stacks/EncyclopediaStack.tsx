import * as React from 'react'
import EncyclopediaScreen from '../../screens/EncyclopediaScreen'
import ArticlesScreen from '../../screens/ArticlesScreen'
import FindHelpScreen from '../../screens/FindHelpScreen'
import NavigationStack, { StackConfig } from '../components/NavigationStack'
import ChatScreen from '../../screens/ChatScreen'

export type EncyclopediaStackParamList = {
  Encyclopedia: undefined
  Articles: {
    subcategoryId: string
  }
  Help: undefined
  Chat: undefined
}

const config: StackConfig<keyof EncyclopediaStackParamList> = {
  initialRouteName: 'Encyclopedia',
  screens: {
    Encyclopedia: {
      title: 'encyclopedia',
      component: EncyclopediaScreen,
    },
    Articles: {
      title: '',
      component: ArticlesScreen,
    },
    Help: {
      title: 'find help',
      component: FindHelpScreen,
    },
    Chat: {
      title: 'chat',
      component: ChatScreen,
    },
  },
}

const EncyclopediaStack = () => <NavigationStack config={config} />

export default EncyclopediaStack
