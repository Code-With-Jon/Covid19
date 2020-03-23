import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPost, fetchComments, addComment} from '../../redux/actions/postActions';
import draftToHtml from 'draftjs-to-html';
import {Link} from 'react-router-dom';
import Comment from '../../Components/Comment/Comment';

export default function(props) {

   const postDocs = useSelector(state => state.post.docs);
   const commentsObject = useSelector(state => state.post.comments);
   const dispatch = useDispatch();

   const [editEnabled, setEditEnabled] = useState(false);
   const [commentContent, setCommentContent] = useState('');

   const postId = props.match.params.post;
   const topic = props.match.params.topic;

   useEffect( () => {
      dispatch(fetchPost(postId))
      dispatch(fetchComments(postId));
      console.log('mounted')
   }, [])

   function getHtmlString() {
      return postDocs[postId] ? draftToHtml(postDocs[postId].contentJSON) : ''
   }

   function nestComments() {
      const commentMap = {};
      const commentList = commentsObject[postId];
    
      // move all the comments into a map of id => comment
      commentList.forEach(comment => commentMap[comment.id] = comment);
    
      // iterate over the comments again and correctly nest the children
      commentList.forEach(comment => {
        if(comment.parentId !== null) {
          const parent = commentMap[comment.parentId];
          parent.children = (parent.children || []).push(comment);
        }
      });
    
      // filter the list to return a list of correctly nested comments
      return commentList.filter(comment => {
        return comment.parentId === null;
      });
    }

   function renderComments() {
      if (!commentsObject[postId]) {
         return;
      }
   
      let commentsArray = commentsObject[postId];

      commentsArray.forEach( (comment, index) => {
         if (comment.parentId) {
            
         }
      } )


   }


   function saveComment(parentId) {
      let data = {
         topic,
         postId,
         parentId: parentId,
         content: commentContent,
      }
      dispatch(addComment(data));
      setEditEnabled(!editEnabled)
   }
   

   //I need a posts collection and comment collection
   return (
      <div>

         <div dangerouslySetInnerHTML={{__html: getHtmlString()}} style={{border: '1px solid black'}}>
         </div>
         <button onClick={() => setEditEnabled(!editEnabled)}></button>
         <div>
            <input type="text" name="comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
            <button onClick={() => saveComment(null)} ></button>
         </div>
         {/* comments go here, needs to be mapped once data is working */}
         {/* <Comment 
            comment={comment}
         /> */}

      </div>
   )
}