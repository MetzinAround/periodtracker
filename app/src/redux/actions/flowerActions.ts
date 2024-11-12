import { createAction } from '../helpers'

export function incrementFlowerProgress() {
  return createAction('INCREMENT_FLOWER_PROGRESS')
}

export function setFlowerProgress(payload: number) {
  return createAction('SET_FLOWER_PROGRESS', payload)
}
