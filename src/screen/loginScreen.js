import React, {useContext, useState, useEffect} from 'react';
import { View, TextInput, Button, Text, Platform, StyleSheet } from "react-native";

import {login as fb_login} from "../api/authAPI";



export default ({navigation}) => {
    const [email, setEmail] = useState("jeremy.trips@gmail.com");
    const [password, setPassword] = useState("Youssoupha1995");
    const [error, setError] = useState("");
    
    const navigateToRegistration = ()=>{
        navigation.navigate('Registration');
    }

    useEffect(()=>{
        
    }, [])

    const login = () => {
        setError("");
        fb_login(email, password)
        .then(()=>{
            // todo navigation
        })
        .catch((err)=>{
            setError(err)
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.logo_view}>
                <Text style={styles.symbol}>Bloody damn symbol</Text>
            </View>
            <View style={styles.content_view}>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor='lightgrey'
                    keyboardType='email-address'
                    style={[styles.textinput, styles.ti_top]}
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={[styles.textinput, styles.ti_bottom]}
                    passwordRules={true}
                    onBlur={()=>{/* Login */}}
                    placeholder="Mot de passe"
                    placeholderTextColor='lightgrey'
                    spellCheck={false}
                    secureTextEntry={true}
                />
                <Text>{error}</Text>
                <Button title="Connexion" onPress={login} />
                <Button title="Pas encore de compte?" onPress={navigateToRegistration}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'lightgreen',
        alignContent: 'center',
    },
    logo_view:{
        flex: 4
    },
    content_view:{
        flex: 3
    },
    symbol:{
        textAlign: 'center',
        marginVertical: 50,
        fontSize: 35
    },
    textinput:{
        marginHorizontal: 50,
        backgroundColor: 'white',
    },
    ti_top:{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    ti_bottom:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
})
