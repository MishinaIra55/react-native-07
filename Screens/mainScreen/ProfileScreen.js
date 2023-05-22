import { StyleSheet, StatusBar, View, Image, Text, ScrollView,  TouchableOpacity,  ImageBackground, FlatList } from "react-native"
import { useEffect, useState } from "react"
import { collection, query, where, getDocs  } from "firebase/firestore";

import {firestore} from '../../firebase/config'
import { useSelector } from "react-redux";
import {EvilIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import LogoutIcon from "../../assets/images/logout.svg";
import {signOut} from "firebase/auth";

export const ProfileScreen = () => {
    const [posts, setPosts] = useState([]);

    const {userId, nickName} = useSelector(state => state.auth);

    const getUserPosts = async () => {
        const q  = query(collection(firestore, "posts"), where("user.userId", "==", userId));
        const querySnapshot = await getDocs(q);
        let item = []
        querySnapshot.forEach((doc) => {
            item.push({ ...doc.data()})
            return item;
        });
        setPosts(item)
    }
    useEffect(() => {
        getUserPosts();
    },[])

    return (
        <View  style={styles.container}>

            <ImageBackground style={styles.image} source={require('../../assets/images/background.png')}>

                <View style={{...styles.containerImage}}>

                    <View style={styles.avatar}>
                    </View>

                    <TouchableOpacity  style={{paddingLeft: 350, marginTop: 22}} >
                        <LogoutIcon width={24} height={24} onPress={signOut}/>
                    </TouchableOpacity>

                    <View style={{ textAlign: 'center', marginTop: 32, marginBottom: 33}}>
                        <Text style={styles.title}>{nickName}</Text>
                    </View>
                    <ScrollView style={{ width: '100%', height: 250 }}>
                    <View style={{width: '100%', paddingLeft: 16, paddingRight: 16}}>
                        <FlatList data={posts} keyExtractor={(item, idx) => idx.toString()} renderItem={({item}) =>

                            <View style={{ marginBottom: 32, width: '100%', height: 250 }}>
                                <Image style={{width: '100%', height: 200, borderRadius: 8}} source={item.photo ? {uri: item.photo} : null}/>
                                <View>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row"}}  activeOpacity={0.8}  onPress={() => navigation.navigate('CommentsScreen', {postId: item.id})}>
                                        <Text>
                                            <EvilIcons  name="comment" size={24} color="#BDBDBD" />
                                        </Text>
                                        <Text style={{color: '#BDBDBD'}}>0</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row"}}  activeOpacity={0.8} onPress={() => navigation.navigate('MapScreen', {location: item.location}) }>
                                        <Text>
                                            <MaterialCommunityIcons name="google-maps" size={24} color="#BDBDBD" />
                                        </Text>
                                        <Text style={{color: '#212121', textDecorationLine: 'underline'}}>{item.nameLocation}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}/>
                    </View>
                    </ScrollView>
                </View >
            </ImageBackground>
            <StatusBar style="auto" />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    containerImage: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        height: '70%',
        position: "relative",
        alignItems: 'center',


    },
    avatar: {
        position: 'absolute',
        top: -60,
        backgroundColor: '#F6F6F6',
        width: 130,
        height: 120,
        borderRadius: 16,
    },
    title: {
        fontFamily: 'RobotoMedium',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',

    },
})