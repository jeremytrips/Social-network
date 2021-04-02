import React, {  } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegisterScreen from "../screen/registerScreen";

export default () => {

    const nav = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <nav.Navigator>
                <nav.Screen name="register" component={RegisterScreen}/>
            </nav.Navigator>
        </NavigationContainer>
    )
}