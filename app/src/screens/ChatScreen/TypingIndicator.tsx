import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { Text } from '../../components/Text'
import { useColor } from '../../hooks/useColor'

export const TypingIndicator = () => {
  const { palette } = useColor()
  const backgroundColor = palette.basic.dark

  const dot1Opacity = useSharedValue(0)
  const dot2Opacity = useSharedValue(0)
  const dot3Opacity = useSharedValue(0)

  useEffect(() => {
    const startAnimation = () => {
      dot1Opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 300, easing: Easing.ease }),
          withTiming(0, { duration: 300, easing: Easing.ease }),
        ),
        -1,
        false,
      )

      dot2Opacity.value = withDelay(
        300,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 300, easing: Easing.ease }),
            withTiming(0, { duration: 300, easing: Easing.ease }),
          ),
          -1,
          false,
        ),
      )

      dot3Opacity.value = withDelay(
        600,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 300, easing: Easing.ease }),
            withTiming(0, { duration: 300, easing: Easing.ease }),
          ),
          -1,
          false,
        ),
      )
    }

    startAnimation()
  }, [dot1Opacity, dot2Opacity, dot3Opacity])

  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: dot1Opacity.value,
  }))

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: dot2Opacity.value,
  }))

  const animatedStyle3 = useAnimatedStyle(() => ({
    opacity: dot3Opacity.value,
  }))

  return (
    <View style={styles.container}>
      <Text>{/* Sets height */}</Text>
      <Animated.View style={[styles.dot, animatedStyle1, { backgroundColor }]} />
      <Animated.Text style={[styles.dot, animatedStyle2, { backgroundColor }]} />
      <Animated.Text style={[styles.dot, animatedStyle3, { backgroundColor }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    marginHorizontal: 4,
    borderRadius: 20,
  },
})
