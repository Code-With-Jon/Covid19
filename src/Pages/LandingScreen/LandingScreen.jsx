import React, { useEffect, useState } from 'react';
import IframeComponent from '../../Components/Map'
import YoutubeList from '../../Components/YoutubeList';
import Topics from '../../Components/Topics/Topics';
import {useDispatch} from 'react-redux';
import {fetchCounter} from '../../redux/actions/postActions';
import ScrollText from '../../Components/LandingScreen/ScrollText'
import NewsCard from '../../Components/LandingScreen/NewsCard';
import {Helmet} from 'react-helmet'

export default function Landing() {
    const dispatch = useDispatch();
    const [mobileScreen, setMobileScreen] = useState(window.innerWidth <= 576)

  useEffect(() => {
    window.addEventListener('resize', () => handleResize());
    return  () => {
        window.removeEventListener('resize', () => handleResize());
    }
  }, [])

  function handleResize() {
    setMobileScreen(window.innerWidth <= 576)
  }

    useEffect( () => {
        dispatch(fetchCounter());
    }, [])
return(
 <div>
      <Helmet>
    <title>Talk Covid 19</title>
    <meta name="description" content="Stay up to date with covid 19 and join in on conversations about covid 19 on our Covid 19 discussion board" />
  </Helmet>
     <ScrollText />
     {/* <div style={{display: 'flex', flexDirection: 'row'}}>
<div style={{display: 'flex', flexDirection: 'column', width: '70vw'}}>
        <IframeComponent src="//datawrapper.dwcdn.net/dlpln/1/" height="100%" width="100%"/>
        </div> */}
       
        {/* <div style={{display: 'flex', flexDirection: 'column', width: '30vw'}}>
        <IframeComponent src="https://www.arcgis.com/apps/Embed/index.html?webmap=14aa9e5660cf42b5b4b546dec6ceec7c" height="100%" width="100%"/>
        </div>  */}

    <h2 style={{marginLeft: '2vw', paddingLeft: '6vw', marginTop: '0vh', color: 'white', background: 'rgba(0,0,0,.87)', width: !mobileScreen ? '20vw' : '52vw'}}>Latest News</h2>
     {/* <div id='news-articles' style={{display: 'flex', overflow: 'scroll', height: '100%'}}> */}

   <NewsCard />









{/* </div> */}

   <Topics />


        <YoutubeList />
        <div style={{display: 'flex', flexDirection: 'column', width: '100vw', height: '60vh', overflow: 'scroll'}} id="metrics">
            <IframeComponent src="https://www.arcgis.com/apps/opsdashboard/index.html#/85320e2ea5424dfaaa75ae62e5c06e61" height="550vh" width="100%"/>
        </div>
    </div>
    )
}