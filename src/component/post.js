import { SourceCode } from "eslint";
import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native"
import { getUser } from "../api/authAPI";
import { setLikePost as setLikePost_fb, resetLikePost as resetLikePost_fb, getPostLikes, getUserRef } from "../api/firestoreAPI";


export default ({data, docSnapshot}) => {

    const [liked, setLiked] = useState(null)
    var id = docSnapshot.id;
    var postRef = null;
    const [userName, setUserName] = useState('')
    const [theDate, setTheDate] = useState(null)

    // Dès chargement de la page
    useEffect(() => {
        postRef = docSnapshot.ref;
        getUserRef(data.user).get()
        .then((resp)=>{
            setUserName(resp.data().nickname);
        })

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
            <View style={{flex : 1,  borderColor: 'black', borderWidth: 0.5, flexDirection: "row"}}>
                <View style={{flex : 1, padding:8}}>
                    <Text style={{fontStyle:'italic', fontSize:12, paddingBottom:5}}>The {data.date.toDate().toString()} </Text>
                    <Text style={{textDecorationLine:'underline', fontSize:18}}>User "{userName}" said :</Text>
                    <Text style={{textAlign : 'center', fontSize:16, paddingBottom:5}}> {data.text} </Text>
                    <Text style={{fontWeight:'bold', fontSize:16 }}>{liked!=null?liked?"je n'aime plus":"j'aime":"chargement"}</Text>
                </View>
                <Image source={{uri:data.imageUrl}} style={{width: 50, height: 50}}/>
            </View>
        </Pressable>
    )
}
