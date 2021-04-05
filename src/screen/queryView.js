import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {ActivityIndicator, TextInput, View, Text, FlatList, Button} from "react-native";
import { fetchUsers } from "../api/firestoreAPI";

import User from "../component/user"

export default ({navigation}) =>{

    const [queriedUserName, setQueriedUserName] = useState("helloworld");
    const [isLoading, setIsLoading] = useState(false);
    const [queriedUsers, setQueriedUser] = useState([]);

    const queryUser = () => {
        setIsLoading(true);
        fetchUsers(queriedUserName)
        .then((resp)=>{
            let users = [];
            resp.forEach(user => {
                users.push(user.data())
            });
            setQueriedUser(users)
            console.log(users);
            setIsLoading(false);
        })
        .catch((error)=>{
            console.error(error);
        });

    }

    return(
        <View style={{flex: 1}}>
            <View>
                <TextInput
                    value={queriedUserName}
                    placeholder="Entrez le nom d'un utilisateur"
                    onChangeText={setQueriedUserName}
                    onBlur={queryUser}
                    style={{flex: 1,backgroundColor: "red"}}
                />
                <Button title="query" onPress={queryUser}/> 
            </View>
            <View style={{ flex: 20}}>
            {
                isLoading?(
                    <ActivityIndicator size="large" style={{backgroundColor: 'blue'}}/>
                ):queriedUsers.length==0?(
                    <Text>Entre username to query</Text>
                ):(
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={queriedUsers}
                        renderItem={({index, item})=>{
                            return(
                                <User user={item} navigate={navigation.navigate}/>
                            );
                        }}
                    />
                )
            }
            </View>
        </View>
    )
}