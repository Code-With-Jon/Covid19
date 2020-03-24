import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTopicPosts} from '../../redux/actions/postActions';
import {fetchUsers} from '../../redux/actions/userActions';
import draftToHtml from 'draftjs-to-html';

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
               <div key={index}>
                  <Link to={`${props.match.url}/${doc.id}`}>
                     <p>{doc.title}</p>
                     <p>Author: {users[doc.postOwner] ? users[doc.postOwner].displayName : ''}</p>
                  </Link>
               </div>
            )
         } )
      }
      return
   }

   //I need a posts collection and comment collection
   return (
      <div>
         <Link to={`${props.match.url}/create`} >
            Create a Post
         </Link>
         <p>

         {props.match.params.topic}
         </p>

         {renderPosts()}
         
      </div>
   )
}