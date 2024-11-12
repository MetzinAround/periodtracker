import { ReduxState } from '../reducers'

const s = (state: ReduxState) => state.flower

export const flowerProgressSelector = (state: ReduxState) => s(state).progress
