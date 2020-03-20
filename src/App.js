import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import './App.css';
import IframeComponent from './Components/Map'
import YoutubeList from './Components/YoutubeList';
import { useEffect, useState } from 'react';



function App() {
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
    <div>
      <NavBar />
    <div style={{height: '100%', width: '100%'}}>
      <div>
      <IframeComponent src="https://www.arcgis.com/apps/Embed/index.html?webmap=14aa9e5660cf42b5b4b546dec6ceec7c" height="100%" width="29%"/>
      </div> 
      <div>
       <IframeComponent src="//datawrapper.dwcdn.net/dlpln/1/" height="100%" width="100%"/>
       </div>
    </div>
<div>
<YoutubeList />
</div>
{newsArticles && newsArticles.map((newsArticle, index) => {
  return(
    <div>
<img src={newsArticle.urlToImage} height='100px' width='100px' />
<p>{newsArticle.author}</p>
<p>{newsArticle.title}</p>
<p>{newsArticle.description}</p>
<p>{newsArticle.url}</p>
<p>{newsArticle.publishedAt}</p>
</div>
  )
})
}

</div>
  );
}


export default App;
