import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

import { registerNewUserWithEmail } from "../api/authAPI";


export default () => {
    const [nickName, setNickName] = useState("")
    const [email, setEmail] = useState("jeremy.trips@gmail.com");
    const [password, setPassword] = useState("Youssoupha1995");
    const [password2, setPassword2] = useState("Youssoupha1995");
    const [error, setError] = useState("")

    const register = () => {
        if( password != password2){
            setError("Mot de passe sont différents");
            return;
        }

        registerNewUserWithEmail()
        .then(()=>{
            // todo add navigation
        })
        .catch((err)=>{
            setError(err);
        })
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
                placeholderTextColor='lightgrey'
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