import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTopicPosts} from '../../redux/actions/postActions';
import {fetchUsers} from '../../redux/actions/userActions';
import draftToHtml from 'draftjs-to-html';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react';
import topicRoutes from '../../utils/topicsRoutes';

export default function(props) {

   const topic = props.match.params.topic;

   const postDocs = useSelector(state => state.post);
   const users = useSelector(state => state.user[topic]);
   const dispatch = useDispatch();


   useEffect( () => {
      dispatch(fetchTopicPosts(topic))
      dispatch(fetchUsers({field: 'activeTopicsOP', value: topic}))
      console.log('mounted')
   }, [])




   function renderPosts() {
      if (postDocs[topic] && postDocs[topic].docsArray.length >= 1) {
        
         return postDocs[topic].docsArray.map( (doc, index) => {
            return (
               <div key={index} >
                  <Item.Group>
                  <Item>
      <Item.Image src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>{doc.title}</Item.Header>
        <p>Author: {users[doc.postOwner] ? users[doc.postOwner].displayName : ''}</p>
        <Item.Meta>
          <span className='cinema'>IFC</span>
        </Item.Meta>
        {/* <Item.Description>{paragraph}</Item.Description> */}
        <Item.Extra>
        <Link to={`${props.match.url}/${doc.id}`}>
          <Button primary floated='right'>
            View
            <Icon name='right chevron' />
          </Button>
          </Link>
        </Item.Extra>
      </Item.Content>
    </Item>
    </Item.Group>       
                
             
               
               </div>
            )
         } )
      }
      return
   }

   //I need a posts collection and comment collection
   return (
      <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
         <Link to={`${props.match.url}/create`} >
         <Button  color="blue">Create Topic</Button>
            
         </Link>
         <h1>

         {topicRoutes.find(element => element.topicId === props.match.params.topic).name}
         </h1>
         
         {renderPosts()}
      
      </div>
   )
}