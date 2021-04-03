/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import TestNavigator from "./navigators/test_navigator";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from "./api/authAPI";
import { AuthContextProvider } from './context/authContext'
import AuthNavigator from './navigators/authNavigator';


const App = () => {

  const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    const onAuthStateChanged = (newUser) => {
        setUser(newUser);
        if (initializing)
            setInitializing(false);
    }

    useEffect(() => {
        const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return authSubscriber;
    }, [])

    if(initializing)
        // todo add splashscreen
        return null

    const renderScreen = () =>{
        let cUser = getUser();
        if(cUser === null){
            return (
                AuthNavigator()
            );
        } else {
            return (
                <AuthContextProvider value={user}>
                    {TestNavigator()}
                </AuthContextProvider>
            );
        }
    }
  

    // TestNavigator()
  
    return (
        <NavigationContainer>
            {renderScreen()}
        </NavigationContainer>
    )
};

export default App;
