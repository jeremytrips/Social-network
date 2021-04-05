import React, {  } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import accountView from "../screen/accountView";
import otherAccoutView from "../screen/otherAccountView"
import queryView from "../screen/queryView";
import accountViewNavigator from "./accountViewNavigator";

export default () => {

    const nav = createBottomTabNavigator();

    return (
        // <NavigationContainer>
            <nav.Navigator>
                <nav.Screen name="account" component={accountView}/>
                <nav.Screen name="queryNav" component={accountViewNavigator}/>
            </nav.Navigator>
        // </NavigationContainer>
    )
}