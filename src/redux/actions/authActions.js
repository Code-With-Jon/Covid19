



export const signInGmail = (credentials) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {

      dispatch({ type: 'LOGIN_REQUEST' })

      const firebase = getFirebase();

      dispatch({ type: 'LOGIN_FAILURE', payload: 'message' })
      
   }
};