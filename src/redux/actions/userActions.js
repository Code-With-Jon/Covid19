export const fetchUsers = (params) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      // const postDocs = getState().post.docs;
      const usersObject = {};
      //NOTE: updating the firestore will automatically update our redux state.firebase.profile state.
      firestore.get({ collection: 'users', where: [ [params.field, 'array-contains', params.value ] ]})
         .then((docsSnapshot) => {
            if (params.field === "activeTopicsOP") {
               usersObject[params.value] = {};
               docsSnapshot.forEach((doc) => {
                  usersObject[params.value][doc.id] = {
                     ...doc.data(),
                  } 
               } )

            } else if (params.field === "activePosts") {
               usersObject.allPosts = {...getState().user.allPosts};
               docsSnapshot.forEach((doc) => {
                  usersObject.allPosts[doc.id] = {
                     ...doc.data(),
                  } 
               })
            }

            dispatch({
               type: "FETCH_USERS", payload: {...usersObject}
            })

         }).catch((err) => {
            console.log(err);
            //NOTE: err has a err.message property that contains the string of the error, we can use it if we want.
         })
   }
}