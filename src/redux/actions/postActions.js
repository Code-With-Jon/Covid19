export const addPost = (data) => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      dispatch({type: "POSTADD_REQUEST"})
      const firestore = getFirestore();
      const uid = getState().firebase.auth.uid;
      const profile = getState().firebase.profile;

      const uploadData = {
         participants: [
            uid
         ],
         postOwner: uid,
         topic: data.topic,
         title: data.title,
         upvotes: [],
         downvotes: [],
         contentJSON: data.contentJSON,
         commentCount: 0,
      }

      try {
         //Update counter
         await firestore.collection('counter').doc('posts').set({
            [data.topic]: {
               count: firestore.FieldValue.increment(1),
               latestPost: {
                  title: data.title,
                  avatarUrl: profile.avatarUrl,
                  displayName: profile.displayName,
                  createdAt: firestore.FieldValue.serverTimestamp(),
               }
            },
         }, {merge: true})


         return firestore.collection('posts').add({
            ...uploadData,
            createdAt: firestore.FieldValue.serverTimestamp(),
         }).then(docRef => {
            //Update user profile reference to post and topic.
            firestore.collection('users').doc(uid).set({
               activeTopicsOP: firestore.FieldValue.arrayUnion(data.topic),
               activePosts: firestore.FieldValue.arrayUnion(docRef.id)
            }, {merge: true});


            //add Profile to users state so refetch is not needed.
            const usersObject = {};
            usersObject.allPosts = {...getState().user.allPosts};
            usersObject.allPosts[docRef.id] = {
               avatarUrl: profile.avatarUrl,
               displayName: profile.displayName,
               email: profile.email,
            } 
            dispatch({
               type: "FETCH_USERS", payload: {...usersObject}
            })


            //add Post to post state so refetch is not needed.
            const postDocs = getState().post.docs;
            dispatch({
               type: "FETCH_POST", payload: {
                  ...postDocs,
                  [docRef.id]: {
                     ...uploadData,
                     createdAt: {
                        seconds: Math.floor(new Date().getTime() / 1000)
                     },
                  }
               }
            })



            dispatch({type: "POSTADD_SUCCESS"})
            return docRef.id
         }).catch(err => {
            dispatch({type: "POSTADD_FAILURE", payload: err.message})
            console.log(err);
         })

      }
      catch(err) {
         dispatch({type: "POSTADD_FAILURE", payload: err.message})
      }

   }
}

export const addComment = (data) => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      dispatch({type: "COMMENTDD_REQUEST"})
      const firestore = getFirestore();
      const uid = getState().firebase.auth.uid;

      const commentObject = getState().post.comments;
      const postDocs = getState().post.docs;

      const uploadData = {
         commentOwner: uid,
         topic: data.topic,
         parentId: data.parentId,
         postId: data.postId,
         content: data.content,
      }

      try {
         //Update counter and update participants in the post
         await firestore.collection('posts').doc(data.postId).set({
            commentCount: firestore.FieldValue.increment(1),
            participants: firestore.FieldValue.arrayUnion(uid),
         }, {merge: true})
         await firestore.collection('users').doc(uid).set({
            // activeTopicsOP: firestore.FieldValue.arrayUnion(data.topic),
            activePosts: firestore.FieldValue.arrayUnion(data.postId)
         }, {merge: true});


         //Add comment to database
         return firestore.collection('posts').doc(data.postId).collection('comments')
         .add({
            ...uploadData,
            createdAt: firestore.FieldValue.serverTimestamp(),
         }).then(docRef => {
   
            //So that person does not have to refresh to see his just posted comment, update the state locally as well.
            if (commentObject[data.postId]) {
               commentObject[data.postId].push({
                  ...uploadData,
                  id: docRef.id,
                  createdAt: {
                     seconds: Math.floor(new Date().getTime() / 1000)
                  },
               })
            } else {
               commentObject[data.postId] = [{
                  ...uploadData,
                  id: docRef.id,
                  createdAt: {
                     seconds: Math.floor(new Date().getTime() / 1000)
                  },
               }]
            }
            dispatch({
               type: "FETCH_COMMENTS", payload: {
                  ...commentObject
               },
            })

            //So that the person can get the updated post with the updated comment count instead of refetching.
            postDocs[data.postId].commentCount += 1;
            dispatch({
               type: "FETCH_POST", payload: {
                  ...postDocs,
               }
            })

            //So that the person can get the updated user instead of refetching.
            const usersObject = {};
            const profile = getState().firebase.profile;
            usersObject.allPosts = {...getState().user.allPosts};
            usersObject.allPosts[data.postId] = {
               avatarUrl: profile.avatarUrl,
               displayName: profile.displayName,
               email: profile.email,
            } 
            dispatch({
               type: "FETCH_USERS", payload: {...usersObject}
            })
   
   
            dispatch({type: "COMMENTADD_SUCCESS"})
            // return docRef.id
         }).catch(err => {
            dispatch({type: "COMMENTADD_FAILURE", payload: err.message})
            console.log(err);
         })

      }
      
      catch(err) {
         dispatch({type: "COMMENTADD_FAILURE", payload: err.message})
      }
   
   }
}

export const fetchTopicPosts = (topic) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      // const postDocs = getState().post.docs;
      const postDocsArray = [];
      //NOTE: updating the firestore will automatically update our redux state.firebase.profile state.
      firestore.get({ collection: 'posts', where: [ ['topic', '==', topic] ], orderBy: ['createdAt', 'desc'] })
         .then((docsSnapshot) => {
            // console.log(doc.data());
            docsSnapshot.forEach((doc) => {
               postDocsArray.push( {
                  id: doc.id,
                  ...doc.data(),
               } )
            } )

            dispatch({
               type: "FETCH_TOPIC_POSTS", payload: {
                  topic: topic,
                  data: {
                     docsArray: postDocsArray,
                  }
               }
            })
         }).catch((err) => {
            console.log(err);
            //NOTE: err has a err.message property that contains the string of the error, we can use it if we want.
         })
   }
}

export const fetchPost = (id) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      const postDocs = getState().post.docs;
      //NOTE: updating the firestore will automatically update our redux state.firebase.profile state.
      return firestore.get({ collection: 'posts', doc: id })
         .then((doc) => {
            // console.log(doc.data());
            if(doc.exists) {
               dispatch({
                  type: "FETCH_POST", payload: {
                     ...postDocs,
                     [id]: {
                        ...doc.data()
                     }
                  }
               })
               return doc.data();
            }
            return null;
         }).catch((err) => {
            return err;
            //NOTE: err has a err.message property that contains the string of the error, we can use it if we want.
         })
   }
}

export const fetchComments = (postId) => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      const commentObject = getState().post.comments;
      const commentDocsArray = [];
      // const commentDocs = {}
      //NOTE: updating the firestore will automatically update our redux state.firebase.profile state.
      firestore.collection('posts').doc(postId).collection('comments').orderBy("createdAt", "asc").get()
         .then((docsSnapshot) => {
            // console.log(doc.data());
            docsSnapshot.forEach((doc) => {
               commentDocsArray.push( {
                  id: doc.id,
                  ...doc.data(),
               } )
               // commentDocs[doc.id] = {
               //    id: doc.id,
               //    ...doc.data(),
               // }
            } )
            dispatch({
               type: "FETCH_COMMENTS", payload: {
                  ...commentObject,
                  [postId]: commentDocsArray,
                  // [postId]: commentDocs,
               }
            })
         }).catch((err) => {
            console.log(err);
            //NOTE: err has a err.message property that contains the string of the error, we can use it if we want.
         })
   }
}

export const fetchCounter = () => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();

      // const commentDocs = {}
      //NOTE: updating the firestore will automatically update our redux state.firebase.profile state.
      firestore.collection('counter').doc('posts').get()
         .then((doc) => {
            // console.log(doc.data());
            
            dispatch({
               type: "FETCH_COUNTER", payload: {
                  ...doc.data(),
               }
            })
         }).catch((err) => {
            console.log(err);
            //NOTE: err has a err.message property that contains the string of the error, we can use it if we want.
         })
   }
}






export const updatePost = (data) => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      dispatch({type: "POSTUPDATE_REQUEST"})
      const firestore = getFirestore();
      const profile = getState().firebase.profile;

      const uploadData = {
         title: data.title,
         contentJSON: data.contentJSON,
      }



      return firestore.collection('posts').doc(data.docId).set({
         ...uploadData,
      }, {merge: true}).then(docRef => {

         //add Profile to users state so refetch is not needed.
         const usersObject = {};
         usersObject.allPosts = {...getState().user.allPosts};
         usersObject.allPosts[data.docId] = {
            avatarUrl: profile.avatarUrl,
            displayName: profile.displayName,
            email: profile.email,
         } 
         dispatch({
            type: "FETCH_USERS", payload: usersObject
         })


         //add Post to post state so refetch is not needed.
         const postDocs = getState().post.docs;
         postDocs[data.docId].title = data.title;
         postDocs[data.docId].contentJSON = data.contentJSON;

         dispatch({
            type: "FETCH_POST", payload: {
               ...postDocs,
            }
         })



         dispatch({type: "POSTUPDATE_SUCCESS"})
         return docRef.id
      }).catch(err => {
         dispatch({type: "POSTUPDATE_FAILURE", payload: err.message})
         console.log(err);
      })

      

   }
}

export const deleteComment = () => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {

   }
}