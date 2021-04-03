import functions from "@react-native-firebase/functions";

functions().useFunctionsEmulator("http://localhost:5001")

export const createUserProfile = (userData) => {
    functions().httpsCallable("createUserProfile")(userData)
    .catch((error)=>{
        console.error(error);
    })
}