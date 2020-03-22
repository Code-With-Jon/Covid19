import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPost} from '../../redux/actions/postActions';
import draftToHtml from 'draftjs-to-html';
import {Link} from 'react-router-dom';

export default function(props) {

   const postDocs = useSelector(state => state.post.docs);
   const dispatch = useDispatch();

   const docId = props.match.params.post;

   useEffect( () => {
      dispatch(fetchPost(docId))
      console.log('mounted')
   }, [])

   function getHtmlString() {
      return postDocs[docId] ? draftToHtml(postDocs[docId].contentJSON) : ''
   }

   //I need a posts collection and comment collection
   return (
      <div>

         <div dangerouslySetInnerHTML={{__html: getHtmlString()}} style={{border: '1px solid black'}}>
         </div>
         <div>
            {/* comments go here */}
         </div>
         
      </div>
   )
}