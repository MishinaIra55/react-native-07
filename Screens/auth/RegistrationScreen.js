import {useState} from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Text,
    Dimensions,
} from "react-native";
import Add from '../../assets/images/add.svg';
import {useDispatch} from "react-redux";
import {authSignUpUser} from "../../redux/auth/authOperations";


export const RegistrationScreen = ({navigation}) => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPassHidden, setIsPassHidden] = useState(true);
    const [isKeyboardShown, setIsKeyboardShown] = useState(false);

    const dispatch = useDispatch();

    const loginHandler = (value) => setLogin(value);
    const emailHandler = (value) => setEmail(value);
    const passwordHandler = (value) => setPassword(value);
    const showPassHandler = () => setIsPassHidden(!isPassHidden);

    const onLogin = () => {
        Keyboard.dismiss();

        dispatch(authSignUpUser({login, email, password}));

        setLogin("");
        setEmail("");
        setPassword("");


    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                source={require("../../assets/images/background.png")}
                style={styles.bgImage}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View
                        style={{
                            ...styles.wrapper,
                            paddingBottom: isKeyboardShown ? 38 : 144,
                        }}
                    >
                        <View
                            style={{
                                ...styles.avatar,
                                left: Dimensions.get("window").width / 2,
                            }}
                        >
                            <Add style={styles.avatarBtn}/>
                        </View>
                        <Text style={styles.heading}>Регистрация</Text>
                        <View style={styles.form}>
                            <TextInput
                                value={login}
                                onChangeText={loginHandler}
                                placeholder="Логин"
                                style={{...styles.input, marginBottom: 16}}
                                onFocus={() => setIsKeyboardShown(true)}
                                onBlur={() => setIsKeyboardShown(false)}
                            />

                            <TextInput
                                value={email}
                                onChangeText={emailHandler}
                                placeholder="Адрес электронной почты"
                                style={{...styles.input, marginBottom: 16}}
                                onFocus={() => setIsKeyboardShown(true)}
                                onBlur={() => setIsKeyboardShown(false)}
                            />

                            <View style={{position: "relative", marginBottom: 43}}>
                                <TextInput
                                    value={password}
                                    onChangeText={passwordHandler}
                                    placeholder="Пароль"
                                    secureTextEntry={isPassHidden}
                                    style={styles.input}
                                    onFocus={() => setIsKeyboardShown(true)}
                                    onBlur={() => setIsKeyboardShown(false)}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.togglePassword}
                                    onPress={showPassHandler}
                                >
                                    <Text style={styles.toggleText}>
                                        {isPassHidden ? "Показать" : "Скрыть"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={onLogin}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.btnText}>Зарегистрироваться</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                activeOpacity={0.8}>
                                <Text
                                    style={styles.signInText}

                                >
                                    Уже есть аккаунт? Войти
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: "flex-end",
        resizeMode: "cover",
    },
    wrapper: {
        paddingTop: 92,
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    avatar: {
        position: "absolute",
        top: -60,
        transform: [{translateX: -60}],
        height: 120,
        width: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
    },

    avatarBtn: {
        position: "absolute",
        bottom: 15,
        right: -13,
        height: 25,
        width: 25,
    },

    heading: {
        marginBottom: 33,
        fontStyle: "normal",
        fontWeight: '500',
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        letterSpacing: 0.01,

        color: "#212121",
    },

    form: {
        marginHorizontal: 16,
    },

    input: {
        height: 50,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,

        fontStyle: "normal",
        fontSize: 16,
        lineHeight: 19,
    },

    togglePassword: {
        position: "absolute",
        top: 16,
        right: 18,
    },

    toggleText: {
        fontStyle: "normal",
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,

        textAlign: "right",
        color: "#1B4371",
    },

    btn: {
        backgroundColor: "#FF6C00",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },

    btnText: {
        fontStyle: "normal",
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,

        textAlign: "center",

        color: "#fff",
    },

    signInText: {
        fontStyle: "normal",
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,

        textAlign: "center",

        color: "#1B4371",
    },
});