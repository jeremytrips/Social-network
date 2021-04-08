import functions from "@react-native-firebase/functions";

functions().useFunctionsEmulator("http://localhost:5001")

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