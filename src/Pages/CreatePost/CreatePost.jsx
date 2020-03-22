import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addPost} from '../../redux/actions/postActions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default function CreatePost(props) {
   const dispatch = useDispatch();

   const [editorState, setEditorState] = useState(EditorState.createEmpty());
   const [title, setTitle] = useState('');
   const [editing, setEditing] = useState(true);
   // const [pictures, setPictures] = useState([]);



   async function createPost() {
      if (!editing) {
         return;
      }
      setEditing(false);
      console.log(title);
      var docId = '';
      const data = {
         topic: props.match.params.topic,
         contentJSON: convertToRaw(editorState.getCurrentContent()),
         title: title,
      }
      try {
         docId = await dispatch(addPost(data))
         props.history.push(`/forum/${props.match.params.topic}/${docId}`)
      }
      catch(err) {
         console.log(err)
      }
   }
   
   function handleEditorStateChange(EditorStateObject) {
      setEditorState(EditorStateObject);
   }


   return (
      <div>
         <button onClick={() => createPost()}>Save</button>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
         <Editor
            placeholder="Type your Post!"
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorStateChange}
            toolbar={{
               image: {
                  
                  // className: undefined,
                  // component: undefined,
                  // popupClassName: undefined,
                  urlEnabled: true,
                  uploadEnabled: true,
                  alignmentEnabled: true,
                  uploadCallback: true,
                  previewImage: true,
                  inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                  alt: { present: false, mandatory: false },
                  defaultSize: {
                    height: 'auto',
                    width: 'auto',
                  },
                },
            }}
         />


      </div>
   )
}