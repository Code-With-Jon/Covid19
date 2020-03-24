



export const signInGmail = () => {
   return async (dispatch, getState, { getFirebase, getFirestore }) => {
      
      const firebase = getFirebase();
      dispatch({ type: 'LOGIN_REQUEST' })

      try {
         //Custom parameters are set in rrf config
         await firebase.login({ provider: 'google', type: 'popup' })
         // console.log('wow')
      }
      catch(err) {
         // console.log('no wow')
      }


      // dispatch({ type: 'LOGIN_FAILURE', payload: 'message' })
      
   }
};

export const signOut = () => {
   return async (dispatch, getState, { getFirebase }) => {
      dispatch({ type: 'LOGOUT_REQUEST' });
      const firebase = getFirebase();
      try {
         await firebase.auth().signOut()
         dispatch({ type: 'LOGOUT_SUCCESS' });
      }
      catch(err) {
         dispatch({ type: 'LOGOUT_FAILURE' })
      }
   }
};