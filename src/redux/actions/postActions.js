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
         // [uid]: true,
         // [data.otherUser]: true,
         // lastMessage: firestore.FieldValue.serverTimestamp(),
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

export const fetchTopicPosts = (topic) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      // const postDocs = getState().post.docs;
      const postDocs = [];
      //NOTE: updating the firestore will automatically update our redux state.firebase.profile state.
      firestore.get({ collection: 'posts', where: [ ['topic', '==', topic] ], orderBy: ['createdAt', 'desc'] })
         .then((docsSnapshot) => {
            // console.log(doc.data());
            docsSnapshot.forEach((doc) => {
               postDocs.push( {
                  id: doc.id,
                  ...doc.data(),
               } )
            } )

            dispatch({
               type: "FETCH_TOPIC_POSTS", payload: {
                  topic: topic,
                  data: postDocs,
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