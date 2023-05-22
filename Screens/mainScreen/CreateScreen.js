import {Camera} from "expo-camera";
import {
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";


import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

import {firestore, storage} from '../../firebase/config'

import * as Location from 'expo-location';
import {addDoc, collection} from "firebase/firestore";


import {MaterialCommunityIcons} from '@expo/vector-icons';

import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Photo from "../../assets/images/camera.svg";


export const CreateScreen = ({navigation}) => {
    const [isKeyBoardActive, setIsBoardActive] = useState(false)
    const [camera, setCamera] = useState(null)
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [nameLocation, setNameLocation] = useState('')
    const [location, setLocation] = useState(null);
    const [dimensions, setdimensions] = useState(
        Dimensions.get("window").width - 20 * 2
    );

    const {userId, nickName} = useSelector((state) => state.auth)


    useEffect(() => {
        (async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');

            }
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                maximumAge: 10000
            });
            setLocation(location);

        })();
    }, []);


    const takeFoto = async () => {

        console.log("name", name);
        console.log("nameLocation", name);
        console.log("location", location);
        try {
            const foto = await camera.takePictureAsync()
            setPhoto(foto.uri)

        } catch (error) {
            console.log('error', error.message)
        }

    }
    const submitFoto = async () => {
        uploadPostToServer()
        navigation.navigate('HomeDefault');
        setIsBoardActive(false)
        Keyboard.dismiss()
        setName('')
        setNameLocation('')
        setPhoto('')
    }

    const uploadPostToServer = async () => {
        try {
            const photo = await uploadPhotoToServer()
            console.log(photo);

            const docRef = await addDoc(collection(firestore, "posts"), {
                name,
                location,
                nameLocation,
                photo,
                user: {
                    userId,
                    nickName,
                }
            });
            console.log("Document written with ID: ", docRef.id);

        } catch (error) {
            console.log("error", error.message);
        }

    }
    const uploadPhotoToServer = async () => {
        try {
            const response = await fetch(photo)
            console.log('response', response);

            const file = await response.blob()

            const uniquePostId = Date.now().toString();

            const storageRef = ref(storage, `postsImage/${uniquePostId}`);
            await uploadBytes(storageRef, file);

            return await getDownloadURL(storageRef);

        } catch (error) {
            console.error("Error uploading photo:", error);
        }
    }


    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get("window").width - 20 * 2;

            setdimensions(width);
        };
        const dimensionsHandler = Dimensions.addEventListener("change", onChange);
        return () => {
            dimensionsHandler.remove();
        };
    }, []);

    const handleChangeName = (value) => setName(value);

    const handleChangeNameLocation = (value) => setNameLocation(value);


    return (
        <>
            <View style={styles.container}>
                <Camera style={styles.camera} ref={setCamera}>
                    {photo && (
                        <View style={styles.photoContainer}>
                            <Image source={{uri: photo}} style={{width: '100%', height: '90%'}}/>
                        </View>
                    )}
                    <TouchableOpacity onPress={takeFoto} style={styles.button}>
                        <Text style={{color: '#fff'}}>
                            <Photo/>
                        </Text>
                    </TouchableOpacity>

                </Camera>
                <View style={{marginBottom: 48}}>
                    <Text style={styles.name}>Редагувати фото</Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={{...styles.form, marginBottom: isKeyBoardActive ? 32 : 100, width: dimensions}}>
                        <View style={{borderBottomColor: '#E8E8E8', borderBottomWidth: 1, marginBottom: 32}}>
                            <TextInput style={styles.input} placeholder="Имя" value={name}
                                       onFocus={() => setIsBoardActive(true)} onChangeText={handleChangeName}/>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomColor: '#E8E8E8',
                            borderBottomWidth: 1,
                            marginBottom: 32
                        }}>
                            <MaterialCommunityIcons name="google-maps" size={24} color="#BDBDBD"/>
                            <TextInput style={{...styles.input, paddingLeft: 8}} placeholder="Место"
                                       value={nameLocation} onFocus={() => setIsBoardActive(true)}
                                       onChangeText={handleChangeNameLocation}/>
                        </View>
                        <TouchableOpacity disabled={photo.length === 0 && true} onPress={submitFoto} style={{
                            width: '100%',
                            height: 51,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${photo.length === 0 ? '#E8E8E8' : '#FF6C00'}`,
                        }}>
                            <Text style={{color: '#000'}}>
                                Опубликовать
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,

    },
    camera: {
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: '#000'
    },
    button: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonPost: {
        // width: '100%',
        // height: 51,
        // borderRadius: 100,
        // backgroundColor: 'rgba(255, 255, 255, 0.3)',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#FF6C00',
    },

    name: {

        fontSize: 16,
        lineHeight: 19,
        marginBottom: 10,
        color: '#BDBDBD',
    },
    form: {
        marginBottom: 100
    },
    input: {
        padding: 10,
    }
})

