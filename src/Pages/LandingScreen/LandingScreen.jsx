import React from 'react';
import IframeComponent from '../../Components/Map'
import YoutubeList from '../../Components/YoutubeList';
import Topics from '../../Components/Topics/Topics';
import { useEffect, useState } from 'react';
import ScrollText from '../../Components/LandingScreen/ScrollText'



export default function Landing() {
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



return(
 <div>
     <ScrollText />
     <div style={{display: 'flex', flexDirection: 'row'}}>
<div style={{display: 'flex', flexDirection: 'column', width: '70vw'}}>
        <IframeComponent src="//datawrapper.dwcdn.net/dlpln/1/" height="100%" width="100%"/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '30vw'}}>
        <IframeComponent src="https://www.arcgis.com/apps/Embed/index.html?webmap=14aa9e5660cf42b5b4b546dec6ceec7c" height="100%" width="100%"/>
        </div> 
 </div>
    <h2 style={{marginLeft: '2vw', paddingLeft: '6vw', marginTop: '2vh', color: 'white', background: 'rgba(0,0,0,.87)', width: '20vw'}}>Latest News</h2>
     <div id='news-articles' style={{display: 'flex', overflow: 'scroll', height: '20vh'}}>
{newsArticles && newsArticles.map((newsArticle, index) => {

        return(
            <div key={index} >
            <a href={newsArticle.url}>
                <div id='news-article' style={{width: '20vw', padding: '2vw'}} >
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img src={newsArticle.urlToImage} height='100px' width='100px' />
                    <p style={{paddingLeft: '1vw'}}>{newsArticle.author}</p>
                </div>
                <p>{newsArticle.title}</p>
                <p>{newsArticle.description}</p>
                <p>{newsArticle.publishedAt}</p>
                </div>
                </a>
            </div>
           
            )
        })
    }
    
</div>

   <Topics />
<div style={{height: '100%', width: '100%'}}>
 

</div>
<div>

<YoutubeList />
</div>

    </div>
    )
}