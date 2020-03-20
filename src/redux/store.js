import { createStore, applyMiddleware, compose } from 'redux';
//thunk is a redux package that is used for handling async on redux. Thunk first halts the dispatch, then it performs the async request/function, and then resumes dispatch. 
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase, {rfConfig} from '../config/firebase';



const initialState = {
};

const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
//NOTE: because we have the firebaseReducer, in our actions we can use stuff like:
// const firebase = getFirebase();
// firebase.auth().signInWithEmailAndPassword(....)
// This allows us to access our firebase data in our components through our redux state such as state.firebase.auth

//createStore(rootReducer, [preloadedState], [enhancer])
//rootReducer is the final, combined reducer that will be passed.
//compose lets us include not additional middleware, but kind of like constructor functions where we can initialize some stuff for the middleware, in this case, we initialize the reduxfirestore and reactreduxfirebase. This allows getFirebase and getFirestore to work with our firebase.


// Add reduxFirestore store enhancer to store creator
// NOTE: BOTH THE METHOD BELOW AND THE ONE IM USING ARE IDENTICAL.
// const createStoreWithFirebase = compose(
//    applyMiddleware(...middlewares),
//    reduxFirestore(firebase, rfConfig), // firebase instance as first argument, rfConfig as optional second
//  )(createStore)
// const store = createStoreWithFirebase(rootReducer, initialState)


const store = createStore(
   rootReducer,
   initialState,
   compose(
      applyMiddleware(...middlewares),
      reduxFirestore(firebase, rfConfig)
   ),
)

   
export default store;