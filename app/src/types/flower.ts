import { ImageSourcePropType } from 'react-native'
import { AvatarName, Locale } from '../resources/translations'
import { AnimationObject } from 'lottie-react-native'

export type FlowerTranslations = {
  // 3
  flower_message_step_3_0: string
  flower_message_step_3_1: string
  flower_message_step_3_2: string
  flower_message_step_3_3: string
  flower_message_step_3_4: string
  flower_message_step_3_5: string
  // 5
  flower_message_step_5_0: string
  flower_message_step_5_1: string
  flower_message_step_5_2: string
  flower_message_step_5_3: string
  flower_message_step_5_4: string
  flower_message_step_5_5: string
  flower_message_step_5_6: string
  flower_message_step_5_7: string
  // 7
  flower_message_step_7_0: string
  flower_message_step_7_1: string
  flower_message_step_7_2: string
  flower_message_step_7_3: string
  flower_message_step_7_4: string
  flower_message_step_7_5: string
  flower_message_step_7_6: string
  flower_message_step_7_7: string
  flower_message_step_7_8: string
  flower_message_step_7_9: string
}

export type FlowerAssets = {
  share: Record<AvatarName, Record<Locale, ImageSourcePropType>>
  steps: {
    3: AnimationObject[]
    5: AnimationObject[]
    7: AnimationObject[]
  }
  confetti: AnimationObject
  tutorialFlower: ImageSourcePropType
}
