import React from 'react'
import { View, Modal, Text, StyleSheet } from 'react-native'
import CustomButton from './CustomButton'

export default function DeleteModal({ modalVisible, setModalVisible, handleDelete, toggleModal }) {
  return (
    <View style={styles.modalContainer}>
      <Modal
        transparent={true}

        animationType="fade"
        hardwareAccelerated
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContentContainer}>
          <View>
            <Text style={styles.descText}>Haluatko varmasti poistaa istunnon?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton title="Kyllä" onPress={handleDelete} />
            <CustomButton title="Peruuta" onPress={toggleModal} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  modalContentContainer: {

    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5,

    elevation: 5,
  },

  descText: {
    fontSize: 18,
    fontFamily: 'Roboto-Light',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center'
  },

  buttonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
})
