import React, {  } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegisterScreen from "../screen/registerScreen";
import LoginScreen from "../screen/loginScreen";
import accountView from "../screen/accountView";

export default () => {

    const nav = createBottomTabNavigator();

    return (
        // <NavigationContainer>
            <nav.Navigator>
                <nav.Screen name="account" component={accountView}/>
                <nav.Screen name="login" component={LoginScreen}/>
                <nav.Screen name="register" component={RegisterScreen}/>
            </nav.Navigator>
        // </NavigationContainer>
    )
}