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
                    onPress={takePicture}
                >
                    <Text style={{textAlign : 'center', fontSize:12, paddingBottom:5}}>Prendre une photo?</Text>
                </Pressable>
                <Pressable
                    // style={[styles.button, styles.buttonClose]}
                    onPress={getPicture}
                >
                    <Text style={{textAlign : 'center', fontSize:12, paddingBottom:5}}>Choisir une photo?</Text>
                </Pressable>
                <Pressable
                    // style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalIsOpen(!modalIsOpen)}
                >
                    <Text style={{textAlign : 'center', fontSize:12, paddingBottom:5}}>Fermer</Text>
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
        height: "20%",
        paddingTop:40,
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
    }
});