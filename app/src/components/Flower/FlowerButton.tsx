import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useColor } from '../../hooks/useColor'
import { Button, ButtonProps } from '../Button'
import { StyleSheet } from 'react-native'
import { FLOWER_ENABLED } from '../../optional/flower'

export const FlowerButton = ({ onPress, style }: ButtonProps) => {
  const { flowerIconColor } = useColor()

  if (!FLOWER_ENABLED) {
    return null
  }

  return (
    <Button onPress={onPress} status={'quaternary'} style={[styles.button, style]}>
      <MaterialCommunityIcons name="flower-tulip" size={36} color={flowerIconColor} />
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    width: 52,
    marginLeft: 8,
    zIndex: 999, // Keep above Avatar
  },
})
