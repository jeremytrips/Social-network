
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { getUser } from "./authAPI";
import { uploadImage } from "./storageAPI";

export const db = firestore();

db.settings({
    host: "localhost:8080",
    ssl: false
});



export const getUserRef = (uid) => {
    return db.collection('users').doc(uid);
}


export const fetchProfileData = async () => {
    const snapshot = await db.collection("users").doc(auth().currentUser.uid).get();
    return snapshot.data();
}


export const createNewPost = (text, imageURI) => {
    return new Promise( async (resolve, reject) => {
        // todo add image save on fb storage
        var data = {
            text: text,
            date: firestore.Timestamp.now(),
            imageUrl: null,
            user: getUser().uid
        }
        try {
            if(imageURI != null){
                let imageUrl = await uploadImage(imageURI);
                data.imageUrl = imageUrl
            }
            db.collection('posts').add(data);
            resolve();
        } catch (error) {
            reject(error);
        }
        
    })
}


export const fetchUser = (uid) => {
    return new Promise( async (resolve, reject) => {
        try {
            user = await db.collection('users').doc(uid).get();
            resolve(user.data());   
        } catch (error) {
            reject(error);
        }
    })

}

export const fetchUserPost = (uid) => {
    return new Promise((resolve, reject)=>{
        const postsCol = db.collection('posts');
        postsCol.where('user', '==', uid).get()
        .then((resp)=>{
            resolve(resp.docs);
        })
        .catch((error)=>{
            console.warn(error);
            reject(error);
        })
    })
}