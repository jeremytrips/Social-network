
import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, Button, Text, Alert, Pressable } from "react-native"

import { logout, getUser } from "../api/authAPI";
import { createNewPost } from "../api/firestoreAPI";
import PictureModal from "../modals/pictureModal";

export default () => {
    const userImage = require("../../assets/default-avatar.png");
    const _cameraImage = require("../../assets/camera.png")

    const user = getUser();
    const [image, setImage] = useState(_cameraImage);
    const [userPost, setUserPost] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [postImageURI, _setPostImageURI] = useState(null);

    const setPostImageURI = (uri) => {
        setImage({uri: uri})
        _setPostImageURI(uri);
    }

    const openPictureModal = () => {
        setModalIsOpen(true);
    }

    const postMessage = () => {
        createNewPost(userPost, postImageURI)
        .then(()=>{
            setUserPost("");
            setImage(_cameraImage);
        })
        .catch((error)=>{
            Alert.alert(
                "Attention",
                "Votre poste n'a pas pu être créer",
                [
                    { text: "OK" }
                ]
            )
        });
    }

    return(
        <View>
            <Image source={userImage} style={styles.avatar}/>
           {user!=null? <Text>{user.displayName}</Text>:null}
            <View>
                <View style={{flexDirection: "row"}}>
                    <TextInput
                        onChangeText={setUserPost}
                        placeholder="Qqch à dire?"

                    />
                    <Pressable onPress={openPictureModal}>
                        <Image source={image} style={{width: 50, height: 50}}/>
                    </Pressable>
                </View>
                    <Button title="Poster" onPress={postMessage}/>
                <Button title="Ajouter une image" onPress={openPictureModal}/>
            </View>
            <PictureModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                setImageURI={setPostImageURI}
            />
            <Button
                title="Se déconnecter"
                onPress={logout}
            /> 
        </View>
    )
};

const styles = StyleSheet.create({
    avatar: {
        width: 256,
        height: 256,
    }
});