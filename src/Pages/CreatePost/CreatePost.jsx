import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addPost, fetchPost, updatePost} from '../../redux/actions/postActions';
import {signInGmail} from '../../redux/actions/authActions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Form } from 'semantic-ui-react';
import './CreatePost.css';

export default function CreatePost(props) {
   const dispatch = useDispatch();

   const postId = props.match.params.post ? props.match.params.post : null;

   const [editorState, setEditorState] = useState(EditorState.createEmpty());
   const [title, setTitle] = useState('');
   const [editing, setEditing] = useState(true);
   const [docExists, setDocExists] = useState(false);
   const [emptyError, setEmptyError] = useState(false);
   // const [pictures, setPictures] = useState([]);
   const uid = useSelector(state => state.firebase.auth.uid);

   //testing states
   const [uploadedImages, setUploadedImages] = useState([])


   useEffect( () => {
      let doc = {};

      async function asyncFetchPost() {
         doc = await dispatch(fetchPost(postId));
         if (doc && (uid === doc.postOwner)) {
            let contentState = convertFromRaw(doc.contentJSON);
            setEditorState(EditorState.createWithContent(contentState));
            setTitle(doc.title);
            setDocExists(true);
         } else {
            props.history.push(`/forum/${props.match.params.topic}`)
         }
      }

      if (postId) {
         asyncFetchPost();
      }

   }, [])

   function loginWithGoogle() {
      dispatch(signInGmail());
    }

   async function createPost(e) {
      e.preventDefault();
      if (!editing) {
         return;
      }
      // console.log(title);
      const contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
         setEmptyError(true);
         return;
      }
      setEditing(false);

      var docId = '';
      const data = {
         topic: props.match.params.topic,
         contentJSON: convertToRaw(contentState),
         title: title,
      }

      if (docExists) {
         docId = postId;
         try {
            await dispatch(updatePost({
               ...data,
               docId: docId,
            }));
            props.history.push(`/forum/${props.match.params.topic}/${docId}`)
         }
         catch(err) {
            console.log(err);
         }
      } else {
         try {
            docId = await dispatch(addPost(data))
            props.history.push(`/forum/${props.match.params.topic}/${docId}`)
         }
         catch(err) {
            console.log(err)
         }
      }

   }
   
   function handleEditorStateChange(EditorStateObject) {
      if (emptyError) {
         setEmptyError(false);
      }
      setEditorState(EditorStateObject);
   }

   const uploadCallback = (file) => {
       // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.
    
   // Make sure you have a uploadImages: [] as your default state
    let uploadedImages2 = [...uploadedImages];

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
      <div style={{width: '80vw', marginRight: 'auto', marginLeft: 'auto'}}>
         <h1>
            Create Topic
         </h1>
         <Form unstackable id="title" onSubmit={createPost} className="createPost-title-container">
            <Form.Group widths='equal'>
               <Form.Input required label='Topic Title' placeholder='Topic Title' name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
    
         </Form>
         {/* <button >Save</button>
         <input type="text" /> */}
         <Editor
            placeholder="Type your Post!"
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName={`editorClassName ${emptyError && 'editorError'}`}
            onEditorStateChange={handleEditorStateChange}
            spellCheck={true}
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
         <div className="createPost-save-button">
            {uid ? 
               <Button type='submit' form="title" positive className="createPost-save-button">Save</Button>
               :
               <Button positive className="createPost-save-button" onClick={() => loginWithGoogle()}>Log In</Button>
            }
         </div>

      </div>
   )
}
