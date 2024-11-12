import { ImageSourcePropType } from 'react-native'
import { assets } from '../resources/assets'

/**
 * Get an asset by path
 * Safe way to access assets, will return null if the asset is not found
 */
export const getAsset = (path: string, assetsMap?: object) => {
  const segments = path.split('.')
  let currentLevel: object = assets
  if (assetsMap) {
    currentLevel = assetsMap
  }

  for (const segment of segments) {
    // @ts-expect-error Can be object or asset because of assets structure
    currentLevel = currentLevel[segment] as object
    if (!currentLevel) {
      // tslint:disable-next-line
      console.warn(`Asset not found: ${path}`)
      return undefined // or a default asset
    }
  }

  const asset = currentLevel as ImageSourcePropType
  return asset
}
