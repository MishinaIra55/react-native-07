import React, {useState, useEffect} from "react";
import {View, StyleSheet, FlatList, Image, Text, TouchableOpacity} from "react-native";

import {firestore} from '../../firebase/config';
import {collection, onSnapshot} from "firebase/firestore";
import {EvilIcons, MaterialCommunityIcons} from "@expo/vector-icons";

export const DefaultScreenPosts = ({navigation}) => {
    const [posts, setPosts] = useState([]);


    const getAllPosts = async () => {
        try {
            await onSnapshot(collection(firestore, 'posts'), (data) => {
                setPosts(data.docs.map((doc) => ({
                    ...doc.data(), id: doc.id
                })));
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllPosts()

    }, []);

    return (
        <View style={styles.container}>
            <FlatList data={posts} keyExtractor={(item, idx) => idx.toString()} renderItem={({item}) =>

                <View style={{marginBottom: 32, width: '100%', height: 250}}>
                    <Image style={{width: '100%', height: 200}} source={item.photo ? {uri: item.photo} : null}/>
                    <View>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                        <TouchableOpacity style={styles.iconContainer} activeOpacity={0.8}
                                          onPress={() => navigation.navigate('Comments', {
                                              postId: item.id,
                                              photo: item.photo
                                          })}>
                            <Text>
                                <EvilIcons name="comment" size={24} color="#BDBDBD"/>
                            </Text>
                            <Text style={{color: '#BDBDBD'}}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer} activeOpacity={0.8}
                                          onPress={() => navigation.navigate('Map', {location: item.location})}>
                            <Text>
                                <MaterialCommunityIcons name="google-maps" size={24} color="#BDBDBD"/>
                            </Text>
                            <Text style={{color: '#212121', textDecorationLine: 'underline'}}>{item.nameLocation}</Text>
                        </TouchableOpacity>
                    </View>
                </View>}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontSize: 16,
        lineHeight: 19,
        // marginBottom: 8,
        color: '#212121',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
    }
});

