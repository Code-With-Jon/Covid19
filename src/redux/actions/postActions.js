export const addPost = (data) => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      dispatch({type: "POSTADD_REQUEST"})
      const firestore = getFirestore();
      const uid = getState().firebase.auth.uid;
      const postDocs = getState().post.docs;
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
                  ...uploadData,
                  createdAt: firestore.FieldValue.serverTimestamp(),
               }
            },
         })

         return firestore.collection('posts').add({
            ...uploadData,
            createdAt: firestore.FieldValue.serverTimestamp(),
         }).then(docRef => {
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
            // commentCount: ,
         })

      }
      catch(err) {

      }

      return firestore.collection('posts').doc(data.postId).collection('comments')
      .add({
         ...uploadData,
         createdAt: firestore.FieldValue.serverTimestamp(),
      }).then(docRef => {

         //So that person does not have to refresh to see his just posted comment.
         if (commentObject[data.postId]) {
            commentObject[data.postId].unshift({
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


         dispatch({type: "COMMENTADD_SUCCESS"})
         // return docRef.id
      }).catch(err => {
         dispatch({type: "COMMENTADD_FAILURE", payload: err.message})
         console.log(err);
      })
   
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

            dispatch({
               type: "FETCH_POST", payload: {
                  ...postDocs,
                  [id]: {
                     ...doc.data()
                  }
               }
            })
            return doc;
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
      firestore.collection('posts').doc(postId).collection('comments').orderBy("createdAt", "desc").get()
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