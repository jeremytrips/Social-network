import functions from "@react-native-firebase/functions";


/**
 * 
 * @param {import("./jsodc").UploadUserData} userData 
 */
export const createUserProfile = (userData) => {
    functions().httpsCallable("createUserProfile")(userData)
    .catch((error)=>{
        console.error(error);
    })
}