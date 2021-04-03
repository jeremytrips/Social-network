
import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, FlatList, Button, ActivityIndicator } from "react-native"

import Post from "../component/post";
import { createNewPost, fetchUserPost, fetchUser } from "../api/firestoreAPI";

export default () => {
    const userImage = require("../../assets/default-avatar.png");

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUser("jH28Nxq1f1xDYCS2iXJMOmKZZM30")
        .then((user) => {
            setUser(user);
            fetchUserPost(user.uid)
            .then((resp)=>{
                let posts = [];
                resp.forEach(post => {
                    posts.push(post.data())
                });
                setPosts(posts)
                setIsLoading(false);
            });
        })
        .catch((error)=> {
            console.log(error);
            setError(error)
        })
    }, [])



    return isLoading?(
        <ActivityIndicator size="large" style={{backgroundColor: 'red'}}/>
    ):(
        <View>
            <View>
                <Image source={userImage} style={styles.avatar}/>
                <Text>{user.nickname}</Text>
            </View>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={posts}
                renderItem={({index, item})=>{
                    return(
                        <Post
                            date={item.date}
                            text={item.text}
                            imageURL={item.imageUrl}
                            user={item.user}
                        />
                    );
                }}

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