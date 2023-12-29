import { hash } from '../../../services/hash'
import { CommonActions } from '../types'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

export interface AccessState {
  credentials: {
    [usernameHash: string]: {
      passwordSalt: string
    }
  }
  lastLoggedInUsername?: string
  keys:
    | {
        key: string
        secretKey: string
      }
    | undefined
}

const initialState: AccessState = {
  credentials: {},
  lastLoggedInUsername: undefined,
  keys: undefined,
}

export function accessReducer(state = initialState, action: CommonActions): AccessState {
  switch (action.type) {
    case 'CREATE_ACCOUNT_SUCCESS': {
      const usernameHash = hash(action.payload.user.name)
      const passwordSalt = uuidv4()

      return {
        ...state,
        lastLoggedInUsername: action.payload.user.name,
        credentials: {
          ...state.credentials,
          [usernameHash]: {
            passwordSalt,
          },
        },
      }
    }

    case 'CREATE_GUEST_ACCOUNT_SUCCESS': {
      const usernameHash = hash(action.payload.name)
      const passwordSalt = uuidv4()

      return {
        ...state,
        lastLoggedInUsername: action.payload.name,
        credentials: {
          ...state.credentials,
          [usernameHash]: {
            passwordSalt,
          },
        },
      }
    }

    case 'SET_STORE_KEYS':
      return {
        ...state,
        keys: action.payload,
      }

    default:
      return state
  }
}
