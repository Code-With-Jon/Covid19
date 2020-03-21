export const addPost = (data) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {
      dispatch({type: "CONVERSATIONADD_REQUEST"})
      const firestore = getFirestore();
      const uid = getState().firebase.auth.uid;

      firestore.collection('posts').add({
         participants: [
            uid
         ],
         // [uid]: true,
         // [data.otherUser]: true,
         // lastMessage: firestore.FieldValue.serverTimestamp(),
         lastMessage: `${new Date()}`,
         lastMessageUnread: {
            [uid]: true,
            [data.otherUser]: true,
         },
         createdAt: firestore.FieldValue.serverTimestamp(),
      })


   }
}