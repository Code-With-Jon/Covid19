//combineReducers combines multiple reducers into one.
import { combineReducers } from 'redux';
//import reducers here:
import authReducer from './authReducer';
import postReducer from './postReducer';
//This is a premade reducer for syncing our data from our firestore to our state.
import { firestoreReducer } from 'redux-firestore';
//This is a premade reducer for syncing our data with stuff from firebase such as authentication/ authenticated users.
import { firebaseReducer } from 'react-redux-firebase';
//NOTE: because we have the firebaseReducer, in our actions we can use stuff like:
// const firebase = getFirebase();
// firebase.auth().signInWithEmailAndPassword(....)
// This allows us to access our firebase data in our components through our redux state such as state.firebase.auth

const rootReducer = combineReducers({
   auth: authReducer,
   post: postReducer,
   firebase: firebaseReducer,
   firestore: firestoreReducer,
})

export default rootReducer;