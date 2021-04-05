
import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, FlatList, Button, ActivityIndicator } from "react-native"

import Post from "../component/post";
import { createNewPost, fetchUserPost, fetchUser } from "../api/firestoreAPI";

export default ({navigation}) => {
    const userImage = require("../../assets/default-avatar.png");

    var user = {nickname: "helloworld", uid: "eyWIX7rESoGh2bcnTJvi4oLqI9a0"};
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState("");

    useEffect(() => {
        // todo 
        // user = navigation.params;
        console.log(new Date());
        fetchUserPost(user.uid)
        .then((resp)=>{
            // let posts = [];
            // resp.forEach(post => {
            //     posts.push([post.refdata()])
            // });
            console.log(new Date());
            setPosts(resp)
            setIsLoading(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, [])



    return(
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Image source={userImage} style={styles.avatar}/>
                <Text>{user.nickname}</Text>
            </View>
            {isLoading?(
                <ActivityIndicator style={{flex: 15}} size="large" />
            ):(
                <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={posts}
                style={{flex: 15}}
                renderItem={({index, item})=>{
                    return(
                        <Post
                            data={item.data()}
                            docSnapshot={item}
                        />
                    );
                }}

            />    
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