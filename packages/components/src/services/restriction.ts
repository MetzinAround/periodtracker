import { isEmpty } from 'lodash'
import { User } from '../redux/reducers/authReducer'
import { Article } from '../types'
import moment from 'moment'

const handleAgeRestriction = (article: Article, user?: User) => {
  const defaultAgeRestriction = 15
  const isAgeRestricted = article.isAgeRestricted || article?.ageRestrictionLevel !== 0
  const ageRestrictionLevel = article?.ageRestrictionLevel ?? defaultAgeRestriction

  if (!isAgeRestricted) {
    // No restriction
    return true
  }

  if (isEmpty(user) || !user) {
    // Cannot verify age - Restricted
    return false
  }

  const age = moment().diff(moment(user.dateOfBirth), 'years')

  if (isAgeRestricted && age < ageRestrictionLevel) {
    // Too young
    return false
  }

  return true
}

const handleVersionRestriction = (article: Article, user?: User) => {
  const { contentFilter = 0 } = article

  if (contentFilter === 0) {
    // Available to all
    return true
  }

  if (isEmpty(user) || !user || !user.metadata?.contentSelection) {
    // Cannot verify - Restricted
    return false
  }

  return user.metadata?.contentSelection === article.contentFilter
}

export const canAccessContent = (article: Article, user?: User) => {
  if (!article) {
    return false
  }
  const passesAgeRestriction = handleAgeRestriction(article, user)
  const passesVersionRestriction = handleVersionRestriction(article, user)
  return passesAgeRestriction && passesVersionRestriction
}

// TODO: PH Use this for Quiz, DYK, survey

// common column is 'ageRestrictionLevel' i.e Article, HelpCenter
export const filterContent = (user, repository) => {
  return repository.filter((item) => canAccessContent(user, item))
}