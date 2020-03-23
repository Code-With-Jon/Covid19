export const addPost = (data) => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      dispatch({type: "POSTADD_REQUEST"})
      const firestore = getFirestore();
      const uid = getState().firebase.auth.uid;

      return firestore.collection('posts').add({
         participants: [
            uid
         ],
         postOwner: uid,
         topic: data.topic,
         title: data.title,
         upvotes: [],
         downvotes: [],
         contentJSON: data.contentJSON,
         createdAt: firestore.FieldValue.serverTimestamp(),
      }).then(docRef => {
         dispatch({type: "POSTADD_SUCCESS"})
         return docRef.id
      }).catch(err => {
         dispatch({type: "POSTADD_FAILURE", payload: err.message})
         console.log(err);
      })


   }
}

export const addComment = (data) => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      dispatch({type: "COMMENTDD_REQUEST"})
      const firestore = getFirestore();
      const uid = getState().firebase.auth.uid;
   
      return firestore.collection('posts').doc(data.postId).collection('comments')
      .add({
         commentOwner: uid,
         topic: data.topic,
         parentId: data.parentId,
         postId: data.postId,
         content: data.content,
         createdAt: firestore.FieldValue.serverTimestamp(),
      }).then(docRef => {
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
      firestore.get({ collection: 'posts', doc: id })
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
         }).catch((err) => {
            console.log(err);
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