import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import './DeleteModal.css';



export default function ModalBasicExample() {
   return(
      <Modal trigger={<Button>Basic Modal</Button>} basic size='small' className="modal" >
         <Header icon='archive' content='Delete Comment' />
         <Modal.Content>
            <p>
               Are you sure you want to delete your comment?
            </p>
         </Modal.Content>
         <Modal.Actions>
         <Button basic color='red' inverted>
            <Icon name='remove' /> Delete
         </Button>
         <Button color='green' inverted>
            <Icon name='checkmark' /> Cancel
         </Button>
         </Modal.Actions>
      </Modal>
   )
} 
