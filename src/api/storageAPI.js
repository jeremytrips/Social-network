import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";

export const uploadImage = (photoURI) => {
    return new Promise( async (resolve, reject)=> {
        try {
            const fileName = photoURI.substring(photoURI.lastIndexOf('/')+1)
            const profilePictureReference = storage().ref(fileName);
            const imageUploadResponse = await profilePictureReference.putFile(photoURI);
            let photoURL = await profilePictureReference.getDownloadURL();
            resolve(photoURL)
        } catch (error) {
            // todo check for imageUploadResponse  
            reject(error);
        }
    })
}

