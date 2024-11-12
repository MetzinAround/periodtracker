import React from 'react'
import { Image, Share, StyleSheet } from 'react-native'
import { flowerAssets } from '../../optional/flower'
import { currentAvatarSelector, currentLocaleSelector } from '../../redux/selectors'
import { useSelector } from '../../redux/useSelector'
import { getAsset } from '../../services/asset'
import { Button } from '../Button'
import { useScreenDimensions } from '../../hooks/useScreenDimensions'

export const FlowerShare = () => {
  const { width, height } = useScreenDimensions()
  const maxWidth = Math.min(width * 0.8, 800)
  const maxHeight = Math.min(height * 0.8, 800)
  const size = Math.min(maxWidth, maxHeight)

  const locale = useSelector(currentLocaleSelector)
  const avatar = useSelector(currentAvatarSelector)
  const source = getAsset(`share.${avatar}.${locale}`, flowerAssets)

  const onSharePress = async () => {
    if (!source) {
      return
    }

    try {
      const assetSource = Image.resolveAssetSource(source)
      const localUri = assetSource.uri

      await Share.share({
        url: localUri,
      })
    } catch (error) {
      //
    }
  }

  return (
    <>
      <Image source={source} style={{ width: size, height: size }} resizeMode="contain" />
      <Button onPress={onSharePress} status={'quaternary'} style={styles.button}>
        share
      </Button>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  button: {
    marginTop: 12,
    minWidth: 120,
  },
})
