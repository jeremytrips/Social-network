import React, {  } from "react";
import { Modal, View, Pressable, StyleSheet, Text } from "react-native";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default ({modalIsOpen, setModalIsOpen, setImageURI}) => {

    const getPicture = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 512,
            maxHeight: 512
        }
        launchImageLibrary(options, (resp)=>{
            // todo alert user that he has cancel.
            if (resp.didCancel)
                return
            setImage({uri: resp.uri});
            setImageURI(resp.uri);
            setModalIsOpen(false);
        })
    }

    const takePicture = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 512,
            maxHeight: 512,
            cameraType: "front"
        }
        launchCamera(options, (resp)=>{
            // todo alert user that he has cancel.
            if (resp.didCancel)
                return
            setImage({uri: resp.uri});
            setImageURI(resp.uri);
            setModalIsOpen(false);
        })
    }

    return( 
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalIsOpen}
            onRequestClose={() => {
                setModalIsOpen(!modalIsOpen);
            }}
        >
            <View style={styles.modal}>
                <Pressable
                    // style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalIsOpen(!modalIsOpen)}
                >
                    <Text>Fermer</Text>
                </Pressable>
                <Pressable
                    // style={[styles.button, styles.buttonClose]}
                    onPress={takePicture}
                >
                    <Text>Prendre une photo?</Text>
                </Pressable>
                <Pressable
                    // style={[styles.button, styles.buttonClose]}
                    onPress={getPicture}
                >
                    <Text>Choisir une photo?</Text>
                </Pressable>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal:{
        alignSelf: "center",
        backgroundColor: "lightgrey",
        width: "80%",
        height: "75%",
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
    }
});