import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {MapScreen} from "../nestedScreens/MapScreen";
import {CommentsScreen} from "../nestedScreens/CommentsScreen";
import {DefaultScreenPosts} from "../nestedScreens/DefaultScreenPosts";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = () => {

    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen name='HomeDefault' component={DefaultScreenPosts} options={{headerShown: false}}/>
            <NestedScreen.Screen name="Comments" component={CommentsScreen}/>
            <NestedScreen.Screen name="Map" component={MapScreen}/>
        </NestedScreen.Navigator>
    )

};


