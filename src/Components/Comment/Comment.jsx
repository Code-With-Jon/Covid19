import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addComment} from '../../redux/actions/postActions';


function Comment(props) {

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

   const nestedComments = (props.comment.children || []).map(comment => {
      return <Comment comment={comment} />;
    });

   return (
      <div>
         {editEnabled ?
         <> 
            <div>
               {props.comment.content}
            </div>
            <input type="text" name="comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
            <button onClick={() => saveComment()} >Save</button>
            <button onClick={() => setEditEnabled(!editEnabled)} >Cancel</button>
         </>
         :
         <>
            <button onClick={() => setEditEnabled(!editEnabled)} >Reply</button>
         </>
         }
         <div>
            {nestedComments}
         </div>
      </div>
   )
}