import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {signInGmail} from '../../redux/actions/authActions';
import {fetchPost, fetchComments, addComment} from '../../redux/actions/postActions';
import {fetchUsers} from '../../redux/actions/userActions';
import draftToHtml from 'draftjs-to-html';
import {Link, useHistory} from 'react-router-dom';
import Comments from '../../Components/Comment/Comment';
import { Button, Comment, Form, Header, Container, Breadcrumb } from 'semantic-ui-react';
import topicRoutes from '../../utils/topicsRoutes';
import {scrollToTopSmooth} from '../../utils/helperFunctions';

import './Post.css';

export default function(props) {

   const postDocs = useSelector(state => state.post.docs);
   const users = useSelector(state => state.user.allPosts);
   const commentsObject = useSelector(state => state.post.comments);
   const uid = useSelector(state => state.firebase.auth.uid);
   const dispatch = useDispatch();
   const history = useHistory();

   const [editEnabled, setEditEnabled] = useState(false);
   const [commentContent, setCommentContent] = useState('');

   const postId = props.match.params.post;
   const topic = props.match.params.topic;
   const topicName = topicRoutes.find(element => element.topicId === props.match.params.topic) ? topicRoutes.find(element => element.topicId === props.match.params.topic).name : 'Page Does Not Exist';

   

   useEffect( () => {
      dispatch(fetchPost(postId))
      dispatch(fetchComments(postId));
      dispatch(fetchUsers({field: 'activePosts', value: postId}))
      console.log('mounted')
   }, [])

   function loginWithGoogle() {
      dispatch(signInGmail());
    }

   function handleNavigate(route) {
      history.push(route)
      scrollToTopSmooth();
   }

   function handleTextAreaInput(e) {
      setCommentContent(e.target.value);
      // console.log(commentContent);
   }

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
      //Reverse the order so that root level comments are arranged by latest to earliest. We still want the nested comments to be earliest to latest tho.
      nestedComments.reverse();

      return nestedComments.map( (comment, index) => {
         return <Comments key={index} comment={comment} nestLevel={1} />;
      });
    }




   function saveComment() {
      let data = {
         topic,
         postId,
         parentId: null,
         content: commentContent,
      }
      // console.log(commentContent);
      dispatch(addComment(data));
      setEditEnabled(!editEnabled)
   }
   
   function returnUser() {
      if (postDocs[postId] && users[postDocs[postId].postOwner]) {
         return users[postDocs[postId].postOwner];
      }
      else return null
   }

   //I need a posts collection and comment collection
   return (
      <div className="post">
         <Breadcrumb>
            <Breadcrumb.Section link onClick={() => handleNavigate('/')}>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link onClick={() => handleNavigate(`/forum/${topic}`)}>{topicName}</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right arrow' />
            <Breadcrumb.Section active>Post</Breadcrumb.Section>
         </Breadcrumb>
         <div className="post-content-container">
            <Container text>
         
               <Header as='h2'>{postDocs[postId] && postDocs[postId].title}</Header>
               <div className="post-content-text" dangerouslySetInnerHTML={{__html: getHtmlString()}}>
               </div>

               <p>Author: {returnUser() && returnUser().displayName}</p>
               {uid ? 
               (editEnabled ?
                  <Form reply >
                     <Form.TextArea style={{width: '100%'}} name="comment" value={commentContent} onChange={handleTextAreaInput} />
                     <div className="post-content-button-container1">
                        <Button content='Post' labelPosition='left' icon='check circle outline' primary onClick={() => saveComment()}/>
                        <Button content='Cancel' labelPosition='left' icon='times circle outline' primary onClick={() => setEditEnabled(!editEnabled)}/>
                     </div>
                  </Form>  
               
                  :
                  <div className="post-content-button-container1">
                     <Button content='Comment' labelPosition='left' icon='edit' primary onClick={() => setEditEnabled(!editEnabled)}/>
                     {/* <button  >Reply</button> */}
                  </div>
               )
               :
               <div className="post-content-button-container1">
                  <Button content='Comment' labelPosition='left' icon='edit' primary onClick={() => loginWithGoogle()}/>
               </div>
               }


               {/* comments go here, needs to be mapped once data is working */}
               <Comment.Group threaded>
                  <Header as='h3' dividing style={{ width: '40vw'}}>
                  Comments
                  </Header>
               <div className="post-comment-container">
                  {nestComments()}
               </div>
               </Comment.Group>

            </Container>
         </div>
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