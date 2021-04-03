import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import LoginView from '../screen/loginScreen';
import RegistrationView from "../screen/registerScreen";



export default function AuthStackNavigator() {      
    const AuthenticationStack = createStackNavigator();
    
    return (
        <AuthenticationStack.Navigator
            mode={'modal'}
            screenOptions={{
                headerShown: false,
                gestureEnabled: false
            }}
        >
            <AuthenticationStack.Screen
                name={'login'}
                component={LoginView}
            />
            <AuthenticationStack.Screen name='register' component={RegistrationView} />

        </AuthenticationStack.Navigator>
    );
}
