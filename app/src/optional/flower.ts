/* eslint-disable @typescript-eslint/no-var-requires */
import { FlowerAssets, FlowerTranslations } from '../types/flower'

let flowerTranslations: FlowerTranslations | object = {}
let flowerAssets: FlowerAssets
let maxFlowerProgress: 3 | 5 | 7 = 3
let FLOWER_ENABLED = false

try {
  const flower = require('../resources/optional/flower')
  flowerTranslations = flower.flowerTranslations
  maxFlowerProgress = flower.maxFlowerProgress
  flowerAssets = flower.flowerAssets
  FLOWER_ENABLED = true
} catch (e) {
  //
}

export { FLOWER_ENABLED, flowerTranslations, maxFlowerProgress, flowerAssets }
