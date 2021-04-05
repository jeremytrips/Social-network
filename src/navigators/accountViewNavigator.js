import React, {  } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountViewScreen from "../screen/otherAccountView";
import QueryViewScreen from "../screen/queryView";


export default () => {
    const StackNav = createStackNavigator();

    return (
        <StackNav.Navigator>
            <StackNav.Screen name="query" component={QueryViewScreen}/>
            <StackNav.Screen name="accountView" component={AccountViewScreen}/>
        </StackNav.Navigator>
    )
}