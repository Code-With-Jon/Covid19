import React, {useState, useEffect} from 'react';
import _ from 'lodash';
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
      //If immediately created and redirected, fetchpost likely won't return anything because firebase still needs time to save, maybe add a set timeout or delay?
      async function asyncFetchPost() {
         const res = await dispatch(fetchPost(postId));
         if (!res.id) {
            setTimeout( () => {
               dispatch(fetchPost(postId))
            }, 1000);
         }
      }
      asyncFetchPost();
      dispatch(fetchComments(postId));
      console.log('mounted')
   }, [])



   function getHtmlString() {
      return postDocs[postId] ? draftToHtml(postDocs[postId].contentJSON) : ''
   }

   function nestComments() {

      if (!commentsObject[postId]) {
         return;
      }

      const commentMap = {};


      const commentList = _.cloneDeep(commentsObject[postId])
      // const commentList = [...commentsObject[postId]];
    
      // move all the comments into a map of id => comment
      commentList.forEach(comment => commentMap[comment.id] = comment);
    
      // iterate over the comments again and correctly nest the children
      commentList.forEach(comment => {
        if(comment.parentId !== null) {
           //NOTE: Since objects and arrays are pointers, if I modify the object, it will also modify the array. The corresponding parent object and commentList item point to the same object memory location. Thus if I push a commentList item into parent.children, the commentList item will also gain a children property. With this same logic, it will be an array pointing to all different parts of itself and will work for multiply nested comments.
          const parent = commentMap[comment.parentId];
          if (parent.children) {
             parent.children.push(comment)
          } else {
             parent.children = [comment];
          }
         //  parent.children = (parent.children || []).push(comment);
        }
      });
    
      // filter the list to return a list of correctly nested comments
      let nestedComments = commentList.filter(comment => {
        return comment.parentId === null;
      });

      return nestedComments.map( (comment, index) => {
         return <Comment key={index} comment={comment} nestLevel={1} />;
      });
    }




   function saveComment() {
      let data = {
         topic,
         postId,
         parentId: null,
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

         {editEnabled ?
         <> 
            <input type="text" name="comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
            <button onClick={() => saveComment()} >Post</button>
            <button onClick={() => setEditEnabled(!editEnabled)} >Cancel</button>
         </>
         :
         <>
            <button onClick={() => setEditEnabled(!editEnabled)} >Reply</button>
         </>
         }


         {/* comments go here, needs to be mapped once data is working */}
         {nestComments()}

      </div>
   )
}







//FOR TESTING
// const commentList = [
//    {
//       id: 1,
//       content: "Number 1",
//       parentId: null,
//    },
//    {
//       id: 2,
//       content: "Nubmer 2",
//       parentId: 1,
//    },
//    {
//       id: 3,
//       content: "Number 3",
//       parentId: 2,
//    },
//    {
//       id: 4,
//       content: "Number 3",
//       parentId: 1,
//    },
//    {
//       id: 5,
//       content: "Number 3",
//       parentId: null,
//    },
   
// ];