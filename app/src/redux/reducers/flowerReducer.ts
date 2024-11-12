import { maxFlowerProgress } from '../../optional/flower'
import { Actions } from '../types'

export type FlowerState = {
  progress: number
}

const initialState: FlowerState = {
  progress: 0,
}

export function flowerReducer(state = initialState, action: Actions): FlowerState {
  switch (action.type) {
    case 'INCREMENT_FLOWER_PROGRESS': {
      const current = state.progress
      return {
        ...state,
        progress: current < maxFlowerProgress ? current + 1 : current,
      }
    }

    case 'SET_FLOWER_PROGRESS':
      return {
        ...state,
        progress: action.payload,
      }

    default: {
      return state
    }
  }
}
