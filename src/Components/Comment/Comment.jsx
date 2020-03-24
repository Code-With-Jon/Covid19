import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addComment} from '../../redux/actions/postActions';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

export default function Comments(props) {

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
         return (
            <Comment.Group threaded>
               {props.comment.children.map( (comment, index) => {
               return <Comments key={index} comment={comment} nestLevel={props.nestLevel + 1} />;
            })}
            </Comment.Group>
         )
         
      }
      return;
   }

   return (
      <Comment>
         <Comment.Avatar src='https://lh3.googleusercontent.com/a-/AOh14GiUFG2OTzQg56hy_DO5Bm3SyRp8wPVV-X18Nwqk4g' />
         <Comment.Content>
            <Comment.Author as='a'>Matt</Comment.Author>
            <Comment.Metadata>
               <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>{props.comment.content}</Comment.Text>
            <Comment.Actions>
               {editEnabled ?
               <> 
                  <input type="text" name="comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
                  <Comment.Action onClick={() => saveComment()}>Post</Comment.Action>
                  <Comment.Action onClick={() => setEditEnabled(!editEnabled)}>Cancel</Comment.Action>
               </>
               :
               <>
                  <Comment.Action onClick={() => setEditEnabled(!editEnabled)}>Reply</Comment.Action>
               </>
               }
            </Comment.Actions>
         </Comment.Content>
        
         {nestedComments()}

      </Comment>
   )
}