import React from 'react';
import logo from './logo.svg';
import './App.css';
import IframeComponent from './Components/Map'

function App() {
  return (
    <div style={{height: '100%', width: '100%'}}>
    <IframeComponent src="https://www.arcgis.com/apps/Embed/index.html?webmap=14aa9e5660cf42b5b4b546dec6ceec7c" height="100%" width="100%"/>
    <IframeComponent src="//datawrapper.dwcdn.net/dlpln/1/" height="100%" width="100%"/>
    </div>
  );
}


export default App;
