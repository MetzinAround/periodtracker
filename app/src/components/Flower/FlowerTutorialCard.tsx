import React from 'react'
import { FLOWER_ENABLED, flowerAssets } from '../../optional/flower'
import { useScreenDimensions } from '../../hooks/useScreenDimensions'
import { Image, StyleSheet } from 'react-native'
import { getAsset } from '../../services/asset'

export const FlowerTutorialCard = () => {
  const { width, height } = useScreenDimensions()

  if (!FLOWER_ENABLED) {
    return null
  }

  const maxWidth = Math.min(width * 0.8, 400)
  const maxHeight = Math.min(height * 0.8, 400)
  const size = Math.min(maxWidth, maxHeight)
  const style = { width: size, height: size }
  const source = getAsset(`tutorialFlower`, flowerAssets)

  return <Image source={source} style={[styles.container, style]} resizeMode="contain" />
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
})
