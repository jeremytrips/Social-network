import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native"


export default ({user, navigate}) => {

    const avatar = require("../../assets/default-avatar.png");

    const navigateToProfile = () => {
        navigate('accountView',
            {
                user: user
            }
        );
    }

    return (
        <Pressable onPress={navigateToProfile}>
            <View style={{height: 55, borderColor: 'lightgrey', borderWidth: 1, flexDirection: "row"}}>
                <Text>{user.nickname}</Text>
                <Image source={avatar} style={{width: 50, height: 50}}/>
            </View>
        </Pressable>
    )
}