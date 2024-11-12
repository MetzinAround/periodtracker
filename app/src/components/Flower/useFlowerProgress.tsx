import { useDispatch } from 'react-redux'
import { useSelector } from '../../redux/useSelector'
import { flowerProgressSelector, verifyPeriodDaySelectorWithDate } from '../../redux/selectors'
import { useToggle } from '../../hooks/useToggle'
import { FLOWER_ENABLED, maxFlowerProgress } from '../../optional/flower'
import { incrementFlowerProgress } from '../../redux/actions'
import moment from 'moment'

export const useFlowerProgress = (inputDayStr: string) => {
  const flowerProgress = useSelector(flowerProgressSelector)
  const [flowerModalVisible, toggleFlowerModal] = useToggle()
  const dispatch = useDispatch()

  const cardAnswersToday = useSelector((state) =>
    verifyPeriodDaySelectorWithDate(state, moment(inputDayStr)),
  )

  const incFlowerProgress = () => {
    if (!FLOWER_ENABLED) {
      return
    }

    // @ts-expect-error TODO:
    const alreadyAnswered = cardAnswersToday?.periodDay === true
    const hasMaxedOut = flowerProgress >= maxFlowerProgress
    const shouldIncrement = !hasMaxedOut && !alreadyAnswered
    if (shouldIncrement) {
      dispatch(incrementFlowerProgress())
      toggleFlowerModal()
    }
  }

  return {
    flowerModalVisible,
    toggleFlowerModal,
    incFlowerProgress,
  }
}
