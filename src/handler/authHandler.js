
// Todo change returned string in plein text
export const AuthErrorHandler = (error) =>{
    switch (error.code) {
        case "auth/requires-recent-login":
            return ""
        // case "auth/provider-already-linked":
        //     return ""
        // case "auth/invalid-credential": 
        //     return ""
        // case "auth/credential-already-in-use" :
        //     return ""
        case "auth/email-already-in-use":
            return "AUTH_REGISTRATION_EMAIL_USED"
        case "auth/invalid-email":
            return "AUTH_REGISTRATION_INVALID_EMAIL"
        case "auth/wrong-password":
            return "AUTH_LOGIN_WRONG_PASSWORD"
        // case "auth/invalid-verification-code":
        //     return ""
        // case "auth/invalid-verification-id":
        //     return ""
        // case "auth/user-mismatch":
        //     return ""
        case "auth/user-not-found":
            return "AUTH_LOGIN_USER_NOT_FOUND"
        case "auth/operation-not-allowed":
            return "AUTH_REGISTRATION_NOT_ALLOWED"
        case "auth/user-disabled":
            return "AUTH_LOGIN_USER_DISABLE"
        case "auth/weak-password":
            return "AUTH_REGISTRATION_WEAK_PASSWORD"
        case "auth/network-request-failed":
            return "AUTH_REGISTRATION_NETWORK_ERROR"
        default:
            throw error;
            return "UNKNOWN_ERROR"
    }
}