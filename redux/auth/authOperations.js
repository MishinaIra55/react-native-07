import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from "firebase/auth";
import {auth} from '../../firebase/config';
import {authSlice, authSingOut} from "./authReducer";



export const authSignUpUser = ({login, email, password}) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
            displayName: login,
        }).then(() => {
            dispatch(
                authSlice.actions.updateUserProfile({
                    userId: auth.currentUser.uid,
                    nickName: auth.currentUser.displayName,
                }));
        }).catch((error) => {
            console.log('not work update', error.message)
        });

    } catch (error) {
        console.log('error.message', error.message);
    }
}

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log('error.message', error.message);
    }
}

export const authStateChangeUser = () => async (dispatch, getState) => {

    try {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(authSlice.actions.authStateChange({stateChange: true}));
                dispatch(
                    authSlice.actions.updateUserProfile({
                        userId: user.uid,
                        nickName: user.displayName,
                    }))
            }
        })
    } catch (error) {
        console.log('error.message', error.message);
    }
}

export const authSignOutUser = () => async (dispatch, getState) => {
    try {
        await signOut(auth);
        dispatch(authSlice.actions.authSingOut());



    } catch (error) {
        console.log('error.message', error.message);
    }
}