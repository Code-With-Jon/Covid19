import React, {useState} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import {useDispatch} from 'react-redux';
import {deleteComment} from '../../redux/actions/postActions';
import './DeleteModal.css';



export default function ModalBasicExample(props) {

   const [modalOpen, setModalOpen] = useState(false);

   const dispatch = useDispatch();
   function handleConfirm() {
      dispatch(deleteComment({
         commentId: props.commentId,
         postId: props.postId
      }));
      setModalOpen(false);
   }

   return(
      <Modal trigger={<button onClick={() => setModalOpen(true)} className='comment-post delete-button'>Delete</button>} basic size='small' open={modalOpen} onClose={() => setModalOpen(false)}>
         <Header icon='archive' content='Delete Comment' />
         <Modal.Content>
            <p>
               Are you sure you want to delete your comment?
            </p>
         </Modal.Content>
         <Modal.Actions>
         <Button basic color='red' inverted onClick={() => setModalOpen(false)}>
            <Icon name='remove' /> Cancel
         </Button>
         <Button color='green' inverted onClick={() => handleConfirm()}>
            <Icon name='checkmark' /> Delete
         </Button>
         </Modal.Actions>
      </Modal>
   )
} 
