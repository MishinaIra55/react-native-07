import React, {useEffect, useState} from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions,
    TextInput,
    SafeAreaView,
    FlatList
} from "react-native";
import {AntDesign} from "@expo/vector-icons";

import {firestore} from '../../firebase/config';
import {useSelector} from "react-redux";
import {collection, onSnapshot, setDoc, doc, Timestamp} from "firebase/firestore";


export const CommentsScreen = ({route}) => {
    const [isKeyBoardActive, setIsBoardActive] = useState(false);
    const [allComments, setAllComments] = useState([]);
    const [comment, setComment] = useState([]);
    const [time, setTime] = useState('');
    const [dimensions, setdimensions] = useState(
        Dimensions.get("window").width - 20 * 2
    );

    const {postId, photo} = route.params;
    const {nickName} = useSelector(state => state.auth);

    useEffect(() => {
        getAllPosts()
    }, [])

    const createPost = async () => {
        try {
            const date = new Date();
            setTime(date);
            const newPostsRef = await doc(collection(firestore, "posts", postId, "comment"))
            const data = {
                comment,
                nickName,
                time: Timestamp.fromDate(new Date())
            }
            await setDoc(newPostsRef, data);
        } catch (error) {
            console.log('error', error.message);
        }
    }

    const getAllPosts = async () => {
        try {
            await onSnapshot(collection(firestore, "posts", postId, 'comment'), (snapshot) => {
                let item = []
                snapshot.docs.forEach((doc) => {
                    console.log(doc.data(), 'clg')
                    item.push({...doc.data(), id: doc.id})
                    return item;
                })
                setAllComments(item)
                console.log(item, 'item')
            })
        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Image style={{width: '100%', height: 200, borderRadius: 8, marginBottom: 5}} source={{uri: photo}}/>
            </View>
            <SafeAreaView>
                <FlatList
                    data={allComments}
                    renderItem={({item}) =>
                        <View style={styles.commentContainer}>
                            <Text>{item.comment}</Text>
                            <Text>{new Date(item.time.seconds * 1000).toUTCString().split(/ /)[4]}</Text>
                        </View>}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={{...styles.form, marginBottom: isKeyBoardActive ? 16 : 100, width: dimensions}}>
                    <View style={{position: 'relative'}}>
                        <TextInput style={styles.input} placeholder="Комментировать..." value={comment}
                                   onFocus={() => setIsBoardActive(true)} onChangeText={setComment}>

                        </TextInput>
                        <AntDesign onPress={createPost} name="arrowup" size={14} color="white" style={{
                            position: 'absolute',
                            right: 8,
                            top: '35%',
                            height: 34,
                            width: 34,
                            borderRadius: 50 / 2,
                            backgroundColor: '#FF6C00',
                            padding: 10
                        }}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
    },
    commentContainer: {
        borderWidth: 1,
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        borderRadius: 6,
        marginBottom: 24,
    },
    name: {
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 10,
        color: '#BDBDBD',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#E8E8E8',
        backgroundColor: '#F6F6F6',
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 16,
        fontSize: 16,
    }
});