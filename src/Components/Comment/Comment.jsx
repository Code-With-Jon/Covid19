import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addComment} from '../../redux/actions/postActions';


export default function Comment(props) {

   const [editEnabled, setEditEnabled] = useState(false);
   const [commentContent, setCommentContent] = useState('');
   const dispatch = useDispatch();

   function saveComment() {
      let data = {
         topic: props.comment.topic,
         postId: props.comment.postId,
         parentId: props.comment.id,
         content: commentContent,
      }
      dispatch(addComment(data));
      setEditEnabled(!editEnabled)
   }

   function nestedComments() { 
      if (props.comment.children) {
         return props.comment.children.map( (comment, index) => {
            return <Comment key={index} comment={comment} nestLevel={props.nestLevel + 1} />;
         });
      }
      return;
   }

   return (
      <div style={{marginLeft: 10}}>
         <div>
            {props.comment.content}
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
         <div>
            {nestedComments()}
         </div>
      </div>
   )
}