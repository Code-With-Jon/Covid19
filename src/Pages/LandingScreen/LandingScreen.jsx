import React from 'react';
import IframeComponent from '../../Components/Map'
import YoutubeList from '../../Components/YoutubeList';
import Topics from '../../Components/Topics/Topics';
import { useEffect, useState } from 'react';
import ScrollText from '../../Components/LandingScreen/ScrollText'
import NewsCard from '../../Components/LandingScreen/NewsCard';


export default function Landing() {
  
return(
 <div>
     <ScrollText />
     {/* <div style={{display: 'flex', flexDirection: 'row'}}>
<div style={{display: 'flex', flexDirection: 'column', width: '70vw'}}>
        <IframeComponent src="//datawrapper.dwcdn.net/dlpln/1/" height="100%" width="100%"/>
        </div> */}
       
        {/* <div style={{display: 'flex', flexDirection: 'column', width: '30vw'}}>
        <IframeComponent src="https://www.arcgis.com/apps/Embed/index.html?webmap=14aa9e5660cf42b5b4b546dec6ceec7c" height="100%" width="100%"/>
        </div>  */}

    <h2 style={{marginLeft: '2vw', paddingLeft: '6vw', marginTop: '0vh', color: 'white', background: 'rgba(0,0,0,.87)', width: '20vw'}}>Latest News</h2>
     <div id='news-articles' style={{display: 'flex', overflow: 'scroll', height: '100%'}}>

   <NewsCard />









</div>

   <Topics />
<div style={{height: '100%', width: '100%'}}>
 

</div>
<div>

<YoutubeList />

</div>
<div style={{display: 'flex', flexDirection: 'column', width: '100vw', height: '60vh'}}>
        <IframeComponent src="https://www.arcgis.com/apps/opsdashboard/index.html#/85320e2ea5424dfaaa75ae62e5c06e61" height="550vh" width="100%"/>
        </div>
    </div>
    )
}