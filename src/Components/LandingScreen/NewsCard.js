import React, {useState, useEffect} from 'react';
import NewsCardItem from '../NewsCard/NewsCard';
import Whirligig from 'react-whirligig'
import {Icon} from 'semantic-ui-react'

export default function NewsCard() {
  const [newsArticles, setNewsArticles] = useState([])
  const refresh = (60000 * 30)
  let whirligig
  const next = () => whirligig.next()
  const prev = () => whirligig.prev()



  useEffect(() => {
  
    getNews()
    setInterval(getNews, refresh);
    },[])

 const getNews = async () => {

    var url = 'https://newsapi.org/v2/top-headlines?' +
          `q=${'corona' || 'covid'}&` +
          'from=2020-03-20&' +
          'sortBy=popularity&' +
          'country=us&' +
          'apiKey=b3db4dbc41ff429ca7d575d12e817330';
          var req = new Request(url);
        const res = await fetch(req)
         const json = await res.json()
         console.log(json.articles)
        setNewsArticles(json.articles)
       console.log('fetched')
  }

 const convertUTCDateToLocalDate = (date) => {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}



  return (
    <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', width: '97%'}}>
    <Icon style={{alignSelf: 'center'}} color='black' link onClick={prev} name={'arrow alternate circle left outline'} size='huge'/>
    
    <Whirligig
      visibleSlides={5}
    //   gutter="1em"
      ref={(_whirligigInstance) => { whirligig = _whirligigInstance}}
      style={{width: '94%'}}
    >
    {newsArticles && newsArticles.map((newsArticle, index) => {
        return(
          <NewsCardItem key={index} newsArticle={newsArticle} />
        )
        }
    )}
      </Whirligig>
      <Icon style={{alignSelf: 'center'}} color='black' link onClick={next} name={'arrow alternate circle right outline'} size='huge'/>
    </div>

  )
}


