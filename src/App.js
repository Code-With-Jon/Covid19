import React, { useEffect, useState } from 'react';
import NavBar from './Components/NavBar/NavBar';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LandingScreen from './Pages/LandingScreen/LandingScreen';
import GeneralTopic from './Pages/general'
import SubForum from './Pages/SubForum/SubForum';
import CreatePost from './Pages/CreatePost/CreatePost';
import Post from './Pages/Post/Post';
import Learn from './Pages/Learn/Learn'
import Footer from './Components/Footer/FooterComponent'
//REDUX IMPORTS
import { Provider } from 'react-redux';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import firebase, { rrfConfig } from './config/firebase';
import store from './redux/store';



function App() {

  //redux firebase props
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }


  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        {...rrfProps}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={LandingScreen}/>
            <Route path="/forum/:topic" exact component={SubForum}/>
            <Route path="/forum/:topic/create" exact component={CreatePost}/>
            <Route path="/forum/:topic/:post" exact component={Post}/>
            <Route path="/forum/:topic/:post/edit" exact component={CreatePost}/>
            <Route path="/learn" exact component={Learn}/>
          </Switch>
          <Footer />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}


export default App;
