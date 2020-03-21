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
   const [uploadedImages, setUploadedImages] = useState([])

   // const onDrop = picture => {
   //   setPictures(picture);
   // };

   async function createPost() {
      setEditing(!editing);
      var docId = '';
      try {
         docId = await dispatch(addPost(convertToRaw(editorState.getCurrentContent())))
         setPostId(docId);
         setHtmlString(draftToHtml(convertToRaw(editorState.getCurrentContent())))
      }
      catch(err) {
         setPostId("Error!")
      }
   }
   
   function handleEditorStateChange(EditorStateObject) {
      setEditorState(EditorStateObject);
   }

   const uploadCallback = (file) => {
       // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.
    
   // Make sure you have a uploadImages: [] as your default state
    let uploadedImages2 = uploadedImages;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }

    uploadedImages2.push(imageObject);

    setUploadedImages( uploadedImages2)
    
    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imageObject.localSrc } });
      }
    );
  };

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
            toolbar={{
               image: {
                  
                  // className: undefined,
                  // component: undefined,
                  // popupClassName: undefined,
                  urlEnabled: true,
                  uploadEnabled: true,
                  alignmentEnabled: true,
                  uploadCallback: uploadCallback,
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