import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Modal, ModalProps } from '../Modal'
import { useColor } from '../../hooks/useColor'
import { FlowerShare } from './FlowerShare'
import { FlowerAnimation } from './FlowerAnimation'
import { FLOWER_ENABLED } from '../../optional/flower'

export const FlowerModal = ({
  visible,
  toggleVisible,
  isStatic = false,
}: ModalProps & {
  isStatic?: boolean
}) => {
  const { backgroundColor } = useColor()
  const [sharingVisible, setSharingVisible] = React.useState(false)

  const onPress = () => {
    setSharingVisible(true)
  }

  React.useEffect(() => {
    setSharingVisible(false)
  }, [visible])

  if (!FLOWER_ENABLED) {
    return null
  }

  return (
    <Modal
      visible={visible}
      toggleVisible={toggleVisible}
      style={[styles.modal, { backgroundColor }]}
    >
      <View style={styles.modalBody}>
        {sharingVisible ? (
          <FlowerShare />
        ) : (
          <FlowerAnimation onPress={onPress} visible={visible} isStatic={isStatic} />
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    borderRadius: 20,
  },
  modalBody: {
    padding: 24,
    alignItems: 'center',
  },
})
