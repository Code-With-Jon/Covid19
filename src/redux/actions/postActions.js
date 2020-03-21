export const addPost = (data) => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      dispatch({type: "CONVERSATIONADD_REQUEST"})
      const firestore = getFirestore();
      const uid = getState().firebase.auth.uid;

      return firestore.collection('posts').add({
         participants: [
            uid
         ],
         postOwner: uid,
         // [uid]: true,
         // [data.otherUser]: true,
         // lastMessage: firestore.FieldValue.serverTimestamp(),
         contentJSON: data,
         createdAt: firestore.FieldValue.serverTimestamp(),
      }).then(docRef => {
         return docRef.id
      }).catch(err => {
         console.log(err);
      })


   }
}