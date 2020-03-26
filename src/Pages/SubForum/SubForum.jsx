import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {signInGmail} from '../../redux/actions/authActions';
import {fetchTopicPosts} from '../../redux/actions/postActions';
import {fetchUsers} from '../../redux/actions/userActions';
import draftToHtml from 'draftjs-to-html';
import { Button, Icon, Image, Item, Label, Breadcrumb } from 'semantic-ui-react';
import topicRoutes from '../../utils/topicsRoutes';
import {scrollToTopSmooth} from '../../utils/helperFunctions';
// import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';

export default function(props) {

   const topic = props.match.params.topic;
   const topicName = topicRoutes.find(element => element.topicId === props.match.params.topic) ? topicRoutes.find(element => element.topicId === props.match.params.topic).name : 'Page Does Not Exist';

   const postDocs = useSelector(state => state.post);
   const users = useSelector(state => state.user[topic]);
   const uid = useSelector(state => state.firebase.auth.uid);
   const dispatch = useDispatch();
   const history = useHistory();
   const [mobileScreen, setMobileScreen] = useState(window.innerWidth <= 576)

   useEffect(() => {
     window.addEventListener('resize', () => handleResize());
     return  () => {
         window.removeEventListener('resize', () => handleResize());
     }
   }, [])
 
   function handleResize() {
     setMobileScreen(window.innerWidth <= 576)
   }

   function loginWithGoogle() {
      dispatch(signInGmail());
    }


   useEffect( () => {
      dispatch(fetchTopicPosts(topic))
      dispatch(fetchUsers({field: 'activeTopicsOP', value: topic}))
      console.log('mounted')
   }, [])




   function renderPosts() {
      if (postDocs[topic] && postDocs[topic].docsArray.length >= 1) {
        
         return postDocs[topic].docsArray.map( (doc, index) => {
            return (
               <Item key={index}>
                  {!mobileScreen ?
                  <Item.Image style={{height: '100px', width: '100px'}} src={users[doc.postOwner] ? users[doc.postOwner].avatarUrl : null} />
                     :
                     <img style={{height: '50px', width: '50px'}} src={users[doc.postOwner] ? users[doc.postOwner].avatarUrl : null} />
                  }
                  <Item.Content>
                     <Item.Header as='div'>{doc.title}</Item.Header>
                     <p>Author: {users[doc.postOwner] ? users[doc.postOwner].displayName : ''}</p>
                     <Item.Meta>
                        {/* <span className='cinema'>IFC</span> */}
                     </Item.Meta>
                     {/* <Item.Description>{paragraph}</Item.Description> */}
                     <Item.Extra>
                        <Link to={`${props.match.url}/${doc.id}`}>
                           <Button primary floated='right'>
                              View
                              <Icon name='right chevron' />
                           </Button>
                        </Link>
                     </Item.Extra>
                  </Item.Content>
               </Item>    
               
            )
         } )
      }
      return
   }

   function handleNavigate(route) {
      history.push(route)
      scrollToTopSmooth();
   }

   //I need a posts collection and comment collection
   return (
      <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
           <Breadcrumb>
               <Breadcrumb.Section link onClick={() => handleNavigate('/')}>Home</Breadcrumb.Section>
               <Breadcrumb.Divider icon='right chevron' />
               <Breadcrumb.Section active>{topicName}</Breadcrumb.Section>
            </Breadcrumb>
            {uid ? 
            <Link to={`${props.match.url}/create`} >
               <Button  color="blue">Create Topic</Button>
            </Link>
            :
            <Button onClick={() => loginWithGoogle()} color="blue">Create Topic</Button>
            }
         <h1>

         {topicName}
         </h1>
         <Item.Group divided>
            {renderPosts()}
         </Item.Group>   
      </div>
   )
}