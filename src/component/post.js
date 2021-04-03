import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native"


export default ({date, imageURL, text, user}) => {

    const likePost = () => {

    }

    return (
        <Pressable onPress={likePost}>
            <View style={{height: 55, borderColor: 'red', borderWidth: 1, flexDirection: "row"}}>
                <View style={{}}>
                    <Text>{text}</Text>
                    <Text>{date.toDate().toString()}</Text>
                </View>
                <Image source={{uri:imageURL}} style={{width: 50, height: 50}}/>
            </View>
        </Pressable>
    )
}