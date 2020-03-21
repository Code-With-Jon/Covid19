import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTopicPosts} from '../../redux/actions/postActions';
import draftToHtml from 'draftjs-to-html';

export default function(props) {

   const topic = props.match.params.topic;

   const postDocs = useSelector(state => state.post[topic]);
   const dispatch = useDispatch();


   useEffect( () => {
      dispatch(fetchTopicPosts(topic))
      console.log('mounted')
   }, [])

   function getHtmlString(doc) {
      return draftToHtml(doc.contentJSON)
   }


   function renderPosts() {
      if (postDocs.length >= 1) {
         return postDocs.map( (doc, index) => {
            return (
               <div key={index} dangerouslySetInnerHTML={{__html: getHtmlString(doc)}} style={{border: '1px solid black'}}>
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