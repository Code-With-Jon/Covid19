import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signInGmail} from '../../redux/actions/authActions';
import {addComment} from '../../redux/actions/postActions';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import {convertTimeToString} from '../../utils/helperFunctions';
import DeleteModal from '../DeleteModal/DeleteModal';
import './Comment.css';

export default function Comments(props) {

   const [editEnabled, setEditEnabled] = useState(false);
   const [commentContent, setCommentContent] = useState('');

   const users = useSelector(state => state.user.allPosts);
   const uid = useSelector(state => state.firebase.auth.uid);

   const dispatch = useDispatch();

   function loginWithGoogle() {
      dispatch(signInGmail());
    }

   function saveComment(e) {
      e.preventDefault();
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
         <Comment.Avatar src={users[props.comment.commentOwner] ? users[props.comment.commentOwner].avatarUrl : null} />
         <Comment.Content>
            <Comment.Author as='a'>{users[props.comment.commentOwner] && users[props.comment.commentOwner].displayName}</Comment.Author>
            <Comment.Metadata>
               <div>{convertTimeToString(props.comment.createdAt.seconds * 1000)}</div>
            </Comment.Metadata>
            <Comment.Text>
               <div className="comment-text-content">{props.comment.content}</div>
            </Comment.Text>
            <Comment.Actions>
               {uid ? 
               ((editEnabled) ?
                  <> 
                     <Form onSubmit={saveComment} reply >
                        <textarea rows={3} required={true} style={{width: '100%', height: 'auto'}} name="comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></textarea>
                        <button type="submit" className='comment-post'>Post</button> 
                        <Comment.Action onClick={() => setEditEnabled(!editEnabled)}>Cancel</Comment.Action>
                     </Form>  
                     {/* <input type="text" name="comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/> */}
                  </>
                  :
                  <>
                     <Comment.Action onClick={() => setEditEnabled(!editEnabled)}>Reply</Comment.Action>
                     <DeleteModal />
                  </>
               )
               :
               <Comment.Action onClick={() => loginWithGoogle()}>Reply</Comment.Action>
               }

            </Comment.Actions>
         </Comment.Content>
        
         {nestedComments()}

      </Comment>
   )
}