
import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, FlatList, Button, ActivityIndicator, Alert, ScrollView } from "react-native"

import Post from "../component/post";
import { createNewPost, fetchUserPost, fetchUser, followUser as followUser_fb, checkIfFollowing } from "../api/firestoreAPI";

export default ({route, navigation}) => {
    const userImage = require("../../assets/default-avatar.png");

    const { user } = route.params;

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        checkIfFollowing(user.uid)
        .then((following)=>{
            setIsFollowing(following);
        })
        .catch((error)=>{
            console.error(error);
        });
        console.log(isFollowing);
        fetchUserPost(user.uid)
        .then((resp)=>{
            setPosts(resp)
            setIsLoading(false);
        })
        .catch((error)=>{
            console.error(error);
            setError(error)
        });
    }, [])

    const followUser = () => {
        followUser_fb(user.uid, !isFollowing)
        .then(()=>{
            setIsFollowing(!isFollowing);
        })
        .catch((error)=>{
            if(error == "EASTER_EGG")
                alertCouillon();
            else
                console.error(error);
        });
    }

    const alertCouillon = () => {
        Alert.alert(
            "Bug dans la matrix",
            "Tu peux pas te suivre tout seul couillon!",
            [
                {
                    text: "Oups",
                    style: "ok",
                },
            ]
        )
    }

    console.log(posts.length);

    return(
        <View style={{}}>
            <View style={{}}>
                <Image source={userImage} style={styles.avatar}/>
                <Text>{user.nickname}</Text>
                <Button title={isFollowing?"Ne plus suivre":"suivre"} onPress={followUser}/>
            </View>
            {isLoading?(
                <ActivityIndicator style={{}} size="large" />
            ):(
                // <ScrollView>
                    <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={posts}
                    style={{marginBottom: 80}}
                    renderItem={({index, item})=>{
                        return(
                            <Post
                                data={item.data()}
                                docSnapshot={item}
                            />
                        );
                    }}

                />    
            // </ScrollView> 
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    avatar: {
        width: 256,
        height: 256,
    }
});