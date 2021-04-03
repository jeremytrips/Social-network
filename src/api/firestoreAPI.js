
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { getUser } from "./authAPI";
import { uploadImage } from "./storageAPI";

export const db = firestore();

db.settings({
    host: "localhost:8080",
    ssl: false
});



export const getUserRef = () => {
    return db.collection('users').doc(getUser().uid)
}


export const fetchProfileData = async () => {
    const snapshot = await db.collection("users").doc(auth().currentUser.uid).get();
    return snapshot.data();
}

export const createUserDocument = ({uid, userData}) => {
    return new Promise((resolve, reject)=>{
        db.collection('users').doc(uid).set({
            nickname: userData.nickname
        })
        .then(resolve)
        .catch((error)=>{
            // todo create error managment
            reject(error);
        })    
    })
}

export const createNewPost = (text, imageURI) => {
    return new Promise( async (resolve, reject) => {
        // todo add image save on fb storage
        console.log(text);
        var data = {
            text: text,
            date: firestore.Timestamp.now(),
            imageUrl: null,
            user: getUserRef()
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