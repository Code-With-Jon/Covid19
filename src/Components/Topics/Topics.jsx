import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import './Topics.css';
import {Link} from 'react-router-dom';
import topicsRoutes from '../../utils/topicsRoutes';
import {
   Button,
   Divider,
   Dropdown,
   Grid,
   Header,
   Icon,
   Image,
   Label,
   Menu,
   Message,
   Segment,
   Table,
   Input,
   Advertisement
 } from 'semantic-ui-react'
 import 'semantic-ui-css/semantic.min.css'
 import AdSense from 'react-adsense';
 import DefaultAvatar from '../../avatar-default.jpg'
 
export default function Topics(props) {

   const counter = useSelector(state => state.post.counter);
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
   return (
      <div>
         <h1 style={{marginLeft: '2vw', paddingLeft: '6vw', marginTop: '2vh', color: 'white', background: 'rgba(0,0,0,.87)', width: !mobileScreen ? '20vw' : '52vw'}}>Discussion Board</h1>
         <div style={{display: 'flex', flexDirection: 'row'}}>
         
            <div style={{flexDirection: 'column', flexWrap: 'no-wrap', width: '10vw'}}>
            {/* <Advertisement unit='wide skyscraper' test='Wide Skyscraper' style={{marginLeft: '5vw'}}>
         <AdSense.Google
  client='ca-pub-7292810486004926'
  slot='7806394673'
/>
         </Advertisement> */}
         </div>
         <div style={{flexDirection: 'column', flexWrap: 'no-wrap', width: '88vw'}}>
         {topicsRoutes.map((topic, index) => {
            return (
          
//                   <Grid container style={{ padding: '1em 0em',  }}>
// <Grid.Row >
// <Grid.Column style={{ }}>
//   <Message style={{backgroundColor: 'white'}}>
//   <Link key={index} to={topic.route} style={{boxShadow: "1px 3px 1px #9E9E9E"}}>
//     <Header as='h1'>{topic.name}</Header>
//     <p>
//     {topic.description}
//     </p>
//     <Button color='blue'>Learn more &raquo;</Button>
//     </Link>
//   </Message>
// </Grid.Column>
// </Grid.Row>
// </Grid>



<Segment basic style={{ display: 'flex', justifyContent: 'center'}}>
<Message style={{backgroundColor: 'white', boxShadow: "3px 3px 2px 2px #9E9E9E", width: '65vw',}}>

<Grid columns={2} relaxed='very' stackable style={{alignItems: 'center'}}>
  <Grid.Column>
 
 
    <Header as='h1'>{topic.name}</Header>
    <p>
    {topic.description}
    </p>
    <Link key={index} to={topic.route} style={{}}>
    <Button color='blue'>DISCUSS &raquo;</Button>
    </Link>

  </Grid.Column>

  <Grid.Column verticalAlign='middle'>
  <Segment basic textAlign='center'>
     <div style={{display: 'flex', flexDirection: "row", justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
     <h4>Posts</h4>
         <p>{counter[topic.topicId] ? counter[topic.topicId].count : 0}</p>
     </div>
    
     </div>

      <Divider horizontal>-</Divider>
      <div style={{display: 'flex', flexDirection: "row", justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
      <h4>Lastest Topic</h4>
      <p>{counter[topic.topicId] ? counter[topic.topicId].latestPost.title : "No Posts Yet"}</p>
      </div>
      <div style={{width: '48%'}}>
     <h4>User</h4>
     <img src={counter[topic.topicId] ? counter[topic.topicId].latestPost.avatarUrl : DefaultAvatar} alt="avatar" style={{height: 30, width: 30}}/>
     </div>
     </div>
   </Segment>   
  </Grid.Column>
 
</Grid>

<Divider vertical className="vertical-topic-bar"></Divider>
</Message>
</Segment>



                  /* <div style={{border: '1px solid purple'}}>
                     <h2></h2>
                     <h4></h4>
                  </div> */
              
            )
         })}
         </div>
      </div>
   </div>
   )
}

