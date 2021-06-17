import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

import { registerNewUserWithEmail } from "../api/authAPI";
import { createUserDocument } from "../api/firestoreAPI";


export default ({navigation}) => {
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    const register = async () => {
        if( password != password2){
            setError("Mot de passe sont différents");
            return;
        }
        try{
            await registerNewUserWithEmail(email, password, nickName);
        } catch (error) {
            setError(error);
        }
    }

    return (
        <View style={{backgroundColor: "lightgrey"}}>
            <Text>
                Registration
            </Text>
            <Text>
                {error!=""?<Text>{error}</Text>:null}
            </Text>
            <TextInput
                value={nickName}
                passwordRules={true}
                onChangeText={setNickName}
                textContentType="nickname"
                placeholder="Nom d'utilisateur"
           />
            <TextInput
                value={email}
                textContentType={"emailAddress"}
                onChangeText={setEmail}
                placeholder="email"
                keyboardType="email-address"
            />
            <TextInput
                value={password}
                passwordRules={true}
                onChangeText={setPassword}
                textContentType="password"
                placeholder="mot de passe"
            />
            <TextInput
                value={password2}
                passwordRules={true}
                onChangeText={setPassword2}
                textContentType="password"
                placeholder="encore"
            />
            
            <Button title="Register" onPress={register}/>
        </View>
    );
}