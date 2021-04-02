
import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, Button } from "react-native"
import { logout } from "../api/authAPI";
import PictureModal from "../modals/pictureModal";

export default () => {
    const userImage = require("../../assets/default-avatar.png")

    const [post, setPost] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [postImageURI, _setPostImageURI] = useState(null);

    const setPostImageURI = (uri) => {
        // todo display image on screen
        _setPostImageURI(uri);
    }

    const openPictureModal = () => {
        setModalIsOpen(true);
    }

    const postMessage = () => {
        // todo in the api
    }

    return(
        <View>
            <Image source={userImage} style={styles.avatar}/>
            <View>
                <TextInput
                    onChange={setPost}
                    placeholder="Qqch à dire?"
                />
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