import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addPost} from '../../redux/actions/postActions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default function CreatePost(props) {
   const dispatch = useDispatch();

   const [editorState, setEditorState] = useState(EditorState.createEmpty());
   // const [pictures, setPictures] = useState([]);

   //testing states
   const [htmlString, setHtmlString] = useState('');
   const [editing, setEditing] = useState(true);
   const [postId, setPostId] = useState('');

   // const onDrop = picture => {
   //   setPictures(picture);
   // };

   async function createPost() {
      if (!editing) {
         return;
      }
      setEditing(false);
      var docId = '';
      const data = {
         topic: props.match.params.topic,
         contentJSON: convertToRaw(editorState.getCurrentContent())
      }
      try {
         docId = await dispatch(addPost(data))
         props.history.push(`/forum/${props.match.params.topic}/${docId}`)
         // setPostId(docId);
         // setHtmlString(draftToHtml(data.contentJSON))
      }
      catch(err) {
         setPostId("Error!")
      }
   }
   
   function handleEditorStateChange(EditorStateObject) {
      setEditorState(EditorStateObject);
   }


   return (
      <div>
         <button onClick={() => createPost()}>Save/Edit</button>
         {/* <ImageUploader
            withPreview={true}
            buttonText="Upload Image"
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
         /> */}
         {editing ? 
         <Editor
            placeholder="Type your Post!"
            editorState={editorState}
            // initialContentState={rawDraftContent}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorStateChange}
         />
         :
         <>
         <p>{postId}</p>
         <div dangerouslySetInnerHTML={{__html: htmlString}} style={{border: '1px solid black'}}>
         </div>
         </>
         }

      </div>
   )
}