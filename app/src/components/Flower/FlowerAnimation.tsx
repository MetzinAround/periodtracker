import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useTranslate } from '../../hooks/useTranslate'
import { flowerProgressSelector } from '../../redux/selectors'
import { useSelector } from '../../redux/useSelector'
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { Text } from '../Text'
import { StyleSheet, View } from 'react-native'
import { flowerAssets, maxFlowerProgress } from '../../optional/flower'
import { Button, DisplayButton } from '../Button'
import LottieView from 'lottie-react-native'
import { useScreenDimensions } from '../../hooks/useScreenDimensions'

export const FlowerAnimation = ({
  onPress,
  visible,
  isStatic,
}: {
  onPress: () => void
  visible: boolean
  isStatic: boolean
}) => {
  const { width, height } = useScreenDimensions()
  const maxWidth = Math.min(width * 0.8, 800)
  const maxHeight = Math.min(height * 0.8, 800)
  const size = Math.min(maxWidth, maxHeight)

  const translate = useTranslate()
  const progress = useSelector(flowerProgressSelector)
  const [currentProgress, setCurrentProgress] = React.useState(
    isStatic ? progress : progress > 0 ? progress - 1 : 0,
  )

  const initialAnimationProgress = isStatic && progress > 0 ? 1 : 0
  const animationProgress = useSharedValue(initialAnimationProgress)
  const confettiProgress = useSharedValue(0)

  React.useEffect(() => {
    if (!visible || progress <= 0) {
      return
    }

    const timeout = setTimeout(() => {
      playAnimation()
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [visible, progress])

  const playAnimation = () => {
    animationProgress.value = withTiming(1, { duration: 5000 }, () => {
      if (progress >= maxFlowerProgress) {
        confettiProgress.value = withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(1, { duration: 2000 }),
        )
      }

      runOnJS(setCurrentProgress)(progress)
    })
  }

  const animatedFlowerProps = useAnimatedProps(() => ({
    progress: animationProgress.value,
  }))

  const animatedConfettiProps = useAnimatedProps(() => ({
    progress: confettiProgress.value,
  }))

  const source = getFlowerLottie(progress)

  const lottieStyle = { width: size, height: size }
  const title = translate(`flower_message_step_${maxFlowerProgress}_${currentProgress}`)
  const completed = currentProgress >= maxFlowerProgress

  return (
    <>
      <Text enableTranslate={false} style={styles.title}>
        {title}
      </Text>

      <View>
        <View style={styles.confettiContainer}>
          <AnimatedLottieView
            style={lottieStyle}
            source={flowerAssets.confetti}
            animatedProps={animatedConfettiProps}
          />
        </View>

        <AnimatedLottieView
          style={lottieStyle}
          source={source}
          animatedProps={animatedFlowerProps}
        />
      </View>

      {completed ? (
        <Button onPress={onPress} style={styles.button}>
          share
        </Button>
      ) : (
        <DisplayButton status={'basic'} style={styles.button}>
          <FontAwesome name={'lock'} size={24} color={'#fff'} />
        </DisplayButton>
      )}
    </>
  )
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView)

const getFlowerLottie = (progress: number) => {
  const steps = flowerAssets.steps?.[`${maxFlowerProgress}`] ?? flowerAssets.steps?.['3']

  if (progress <= 0) {
    return steps[0]
  } else if (progress > 0 && progress < steps.length) {
    return steps[progress - 1]
  } else {
    return steps[steps.length - 1]
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  confettiContainer: {
    position: 'absolute',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    marginTop: 8,
    minWidth: 120,
  },
})
