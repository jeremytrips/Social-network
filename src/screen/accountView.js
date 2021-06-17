
import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TextInput, Button, Text, Alert, Pressable, ScrollView } from "react-native"
import { FlatList } from "react-native-gesture-handler";

import { logout, getUser } from "../api/authAPI";
import { createNewPost, fetchFollowerPost } from "../api/firestoreAPI";
import PictureModal from "../modals/pictureModal";

import Post from "../component/post";

export default () => {
    const _cameraImage = require("../../assets/camera.png")

    const user = getUser();
    const [image, setImage] = useState(_cameraImage);
    const [userPost, setUserPost] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [postImageURI, _setPostImageURI] = useState(null);
    const [followingPosts, setFollowingPosts] = useState(null);


    useEffect(() => {
        fetchFollowerPost()
        .then((posts)=>{
            var temp = [];
            posts.forEach(post => {
                temp.push(post);
            });
            setFollowingPosts(temp);
        })
    }, [])

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
        <View style={ styles.page }>
           {user!=null? <Text>{user.displayName}</Text>:null}
            <View style={ styles.utilisateur }>
                
                <Button
                    color='red'
                    title="Disconnect"
                    onPress={logout}
                />
                
                <View style={ styles.input }>

                    <View style={{flex : 2}}>
                        <Pressable onPress={openPictureModal}>
                            <Image source={image} style={{ width : 50, height : 50, padding: 10 }}/>
                        </Pressable>
                    </View>

                    <View style={{flex : 10, padding:5}}>
                        <TextInput
                            style={{textAlign:'center'}}
                            multiline
                            value={userPost}
                            onChangeText={setUserPost}
                            placeholder="Something to say ?"
                        />
                    </View>
                </View>

                <Button title="New post" onPress={postMessage}/>
            
                
            </View>

            <PictureModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                setImageURI={setPostImageURI}
            />

            <View style={ styles.container }>
                {/* <ScrollView> */}
                <FlatList
                    keyExtractor={(followingPosts, index) => index.toString()}
                    data={followingPosts}
                    renderItem={({index, item})=>{
                        return(
                            <Post
                                data={item.data()}
                                docSnapshot={item}
                            />
                        );
                    }}
                /> 
                {/* </ScrollView> */}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({

    avatar: {
        flex : 1,
        width: 256,
        height: 256,
    },

    container:{
        flex : 3,
        backgroundColor:'lightblue',
        paddingTop : 10,
    },

    utilisateur:{
        flex : 1,
        backgroundColor : 'white',
    },

    input:{
        flex : 1, 
        backgroundColor : 'white', 
        flexDirection: "row", 
        alignItems: 'center',
    },

    page:{
        flex:5
    }
});