
import firestore, {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { getUser } from "./authAPI";
import { uploadImage } from "./storageAPI";

export const db = firestore();

db.settings({
    host: "localhost:8080",
    ssl: false
});

/**
 * Return a reference pointing to the user document for any read or update
 * @param {String} uid uid of the user
 * @async
 * @returns {FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>}
 */
export const getUserRef = (uid) => {
    return db.collection('users').doc(uid);
}

/**
 * Return all fields in the document as an Object. Returns 'undefined' if the document doesn't exist.
 * @returns {Promise<FirebaseFirestoreTypes.DocumentData>}
 */
export const fetchProfileData = async () => {
    return new Promise( async (resolve, reject)=>{
        const snapshot = await db.collection("users").doc(auth().currentUser.uid).get()
        .then((snapshot)=>{
            resolve(snapshot.data())
        })
        .catch((error)=>{
            // todo see for error handling.
            throw error;
            reject(error);
        })
    })
}


export const createNewPost = (/** @type {any} */ text, /** @type {any} */ imageURI) => {
    return new Promise( async (resolve, reject) => {
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
    });
}

export const fetchUsers = (username) =>{
    return new Promise((resolve, reject)=>{
        const postsCol = db.collection('users');
        postsCol.where('nickname', '==', username).get()
        .then((resp)=>{
            resolve(resp.docs);
        })
        .catch((error)=>{
            reject(error);
        })
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
            reject(error);
        });
    })
}


export const setLikePost = (id) => {
    return new Promise((resolve, reject)=>{
        db.collection("posts").doc(id)
        .collection("likes").doc(getUser().uid).set({liked: true})
        .then(()=>{
            resolve()
        })
        .catch((error)=>{
            reject(error);
        }); 
    });
}

export const resetLikePost = (id) => {
    return new Promise((resolve, reject)=>{
        db.collection("posts").doc(id)
        .collection("likes").doc(getUser().uid).set({liked: false})
        .then(()=>{
            resolve()
        })
        .catch((error)=>{
            reject(error);
        }); 
    });
}

export const getPostLikes = (id) => {
    return new Promise((resolve, reject)=>{
        db.collection("posts").doc(id)
        .collection("likes").doc(getUser().uid).get()
        .then((resp)=>{
            if (resp.exists && resp.data().liked)
                resolve(true);
            else
                resolve(false);
        })
        .catch((error)=>{
            reject(error);
        }); 
    });
}

export const checkIfFollowing = (uid) => {
    return new Promise((resovle, reject)=>{
        db.collection("follow").where("followerUser", "==", getUser().uid).where("followingUser", "==", uid).get()
        .then((docSnap)=> {
            if (docSnap.size == 1){
                resovle(docSnap.docs[0].data().following);
            } else if(docSnap.size == 0){
                resovle(false);
            } else if(docSnap.size > 1){
                reject("GOT MULTIPLE DOCUMENTS. Should have 0 or 1.");
            }
        })
        .catch((error)=>{
            reject(error);
        });
    });
} 

export const followUser = (uid, value) => {
    return new Promise((resovle, reject)=>{
        // if(uid == getUser().uid)
        //     reject("EASTER_EGG")
        db.collection("follow").where("followerUser", "==", getUser().uid).where("followingUser", "==", uid).get()
        .then((docSnap)=> {
            if (docSnap.size == 0){
                db.collection("follow")
                .add({
                    followingUser: uid,
                    followerUser: getUser().uid,
                    following: value
                })
                .then((resp)=> {
                    resolve();
                })
                .catch((error)=>{
                    reject(error);
                });                
            } else if(docSnap.size == 1){
                docSnap.docs[0].ref.update({
                    following: value
                })
                .then((resp)=>{
                    resovle();
                })
                .catch((error)=>{
                    reject(error);
                });    
            } else {
                reject("GOT MULTIPLE DOCUMENTS. Should have 0 or 1.");
            }
        })
        .catch((error)=>{ 
            reject(error);
        });
    });
}