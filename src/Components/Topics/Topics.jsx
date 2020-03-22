import React from 'react';
import './Topics.css'
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
   Input
 } from 'semantic-ui-react'
 import 'semantic-ui-css/semantic.min.css'

export default function Topics(props) {


   return (
      <div>
         <h1>Categories</h1>
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



<Segment basic>
<Message style={{backgroundColor: 'white', boxShadow: "1px 3px 1px #9E9E9E"}}>

<Grid columns={2} relaxed='very' stackable>
  <Grid.Column>
 
  <Link key={index} to={topic.route} style={{}}>
    <Header as='h1'>{topic.name}</Header>
    <p>
    {topic.description}
    </p>
    <Button color='blue'>Learn more &raquo;</Button>
    </Link>

  </Grid.Column>

  <Grid.Column verticalAlign='middle'>
  <Segment basic textAlign='center'>
     <div style={{display: 'flex', flexDirection: "row", justifyContent: 'space-between'}}>
        <div>
     <h4>Topics</h4>
     <p>2</p>
     </div>
     <div>
     <h4>Users</h4>
     </div>
     </div>

      <Divider horizontal>-</Divider>

      <h4>Lastest Topic</h4>
      <p>This is a test subject</p>
   </Segment>   
  </Grid.Column>
 
</Grid>

<Divider vertical></Divider>
</Message>
</Segment>



                  /* <div style={{border: '1px solid purple'}}>
                     <h2></h2>
                     <h4></h4>
                  </div> */
              
            )
         })}
      </div>
   )
}

