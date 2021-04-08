import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { AuthErrorHandler } from "../handler/authHandler";

const __USE_EMULATOR__ = true;
const __AUTH_EMULATOR__ = "http://localhost:9099"

/**
 * Get reload and resolve user from the firebase app.
 * @returns {Promise<FirebaseAuthTypes.User>}
 */
export const updateAndGetUser = () =>{
    return new Promise((resolve, reject) => {
        auth().currentUser.reload()
        .then(()=>{
            resolve(auth().currentUser);
        })
        .catch(()=>{
            reject();
        });
    });
}

/**
 * Get user from the firebase app.
 * @returns {FirebaseAuthTypes.User}
 */
export const getUser = () => {
    return auth().currentUser
}

/**
 * Register a new user in firebase.
 *  
 * @param {string} userEmail email of the user
 * @param {string} password password of the uer
 * @param {import("./jsodc").UploadUserData} userData contains the user data.
 * @returns {Promise<void>}
 * @error AUTH_REGISTRATION_EMAIL_USED email is already used.
 * @error AUTH_REGISTRATION_INVALID_EMAIL email not parsed.
 * @error AUTH_REGISTRATION_NOT_ALLOWED for some reason registration disbaled. (should not append)
 * @error AUTH_REGISTRATION_WEAK_PASSWORD user password's to weak.
 * @error AUTH_REGISTRATION_NETWORK_ERROR Network errors
 * @error AUTH_REGISTRATION_INTERN_ERROR means that something went wrong inside the app.
 */
export const registerNewUserWithEmail = (userEmail, password, userData) => {
    return new Promise( async (resolve, reject) => {  
        try {
            if(__USE_EMULATOR__)
                auth().useEmulator(__AUTH_EMULATOR__);
            await auth().createUserWithEmailAndPassword(userEmail, password);
            resolve();
        } catch (error) {
            const errorTranslation = AuthErrorHandler(error);
            reject(errorTranslation);
        }
    });
}

/**
 * Function used to login user in firebase app.
 * todo if error is of some kind, show button to register or reactivate email.
 * @param {string} email user's email
 * @param {string} password user's password
 * @error AUTH_LOGIN_INVALID_EMAIL email not parsed.
 * @error AUTH_LOGIN_USER_DISABLE user is disable
 * @error AUTH_LOGIN_USER_NOT_FOUND user not in db
 * @error AUTH_LOGIN_WRONG_PASSWORD Wrong password entered
 * @error AUTH_REGISTRATION_NETWORK_ERROR Network errors
 * 
 */

export const login = (email, password) => {
    return new Promise((resolve, reject)=>{
        if(__USE_EMULATOR__)
            auth().useEmulator(__AUTH_EMULATOR__);
        auth().signInWithEmailAndPassword(email, password)
        .then(() =>{
            resolve();
        })
        .catch((error)=>{
            const errorTranslation = AuthErrorHandler(error);
            reject(errorTranslation);
        });
    })
}

/**
 * Logout currently logged in user.
 * @returns {Promise<void>}
 */
export const logout = () =>{
    return new Promise((resolve, reject) => {
        auth().signOut()
        .then(resolve)
        .catch(reject);
    })
}
