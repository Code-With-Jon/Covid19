import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addPost} from '../../redux/actions/postActions';
import ImageUploader from "react-images-upload";
<<<<<<< HEAD
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

=======
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 
import buttonList from './buttonList'
>>>>>>> 4d4c8a3c805ba3d51980ef126af0e90293cc2e47

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
      setEditing(!editing);
      const docId = await dispatch(addPost(convertToRaw(editorState.getCurrentContent())))
      setPostId(docId);
      setHtmlString(draftToHtml(convertToRaw(editorState.getCurrentContent())))
   }
   
   function handleEditorStateChange(EditorStateObject) {
      setEditorState(EditorStateObject);
   }

   // function onContentStateChange(RawDraftContentStateObject) {
   //    // console.log(convertFromRaw(RawDraftContentStateObject))
   //    setRawDraftContent(RawDraftContentStateObject);
   // }

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