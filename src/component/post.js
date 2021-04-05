import { SourceCode } from "eslint";
import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native"
import { getUser } from "../api/authAPI";
import { setLikePost as setLikePost_fb, resetLikePost as resetLikePost_fb, getPostLikes } from "../api/firestoreAPI";


export default ({data, docSnapshot}) => {

    const [liked, setLiked] = useState(null)
    var id = docSnapshot.id;
    var postRef = null;

    useEffect(() => {
        postRef = docSnapshot.ref;
        getPostLikes(id)
        .then((liked)=>{
            setLiked(liked);
        })
        .catch((error)=>{
            console.error(error);
        })
    }, [])

    const setLikePost = () => {
        setLikePost_fb(id)
        .catch((error)=>{
            console.error(error);
        });
        setLiked(true);
    }

    const resetLikePost = () => {
        resetLikePost_fb(id)
        .catch((error)=>{
            console.error(error);
        });
        setLiked(false);
    }

    return (
        <Pressable onPress={liked?resetLikePost:setLikePost}>
            <View style={{height: 55, borderColor: 'red', borderWidth: 1, flexDirection: "row"}}>
                <View style={{}}>
                    <Text>{data.text}</Text>
                    <Text>{data.date.toDate().toString()}</Text>
                    <Text>{liked!=null?liked?"je n'aime plus":"j'aime":"chargement"}</Text>
                </View>
                <Image source={{uri:data.imageUrl}} style={{width: 50, height: 50}}/>
            </View>
        </Pressable>
    )
}