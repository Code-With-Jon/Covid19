import React, { useEffect, useState } from 'react';
import NavBar from './Components/NavBar/NavBar';
import './App.css';
import IframeComponent from './Components/Map'
import YoutubeList from './Components/YoutubeList';
import Topics from './Components/LandingScreen/Topics';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingScreen from './Pages/index'
import GeneralTopic from './Pages/general'

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


  const [newsArticles, setNewsArticles] = useState([])



  useEffect(() => {
    getNews()
    },[])

 const getNews = async () => {

var url = 'http://newsapi.org/v2/top-headlines?' +
          'q=corona&' +
          'from=2020-03-20&' +
          'sortBy=popularity&' +
          'country=us&' +
          'apiKey=b3db4dbc41ff429ca7d575d12e817330';
          var req = new Request(url);
        const res = await fetch(req)
         const json = await res.json()
         console.log(json.articles)
        setNewsArticles(json.articles)
       
  }

 const convertUTCDateToLocalDate = (date) => {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        {...rrfProps}>
        <Router>
          <Route path="/" component={LandingScreen}/>
          <Route path="/general" component={GeneralTopic}/>

        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}


export default App;
