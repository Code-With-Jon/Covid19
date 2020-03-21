import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addPost} from '../../redux/actions/postActions';
import ImageUploader from "react-images-upload";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 
import buttonList from './buttonList'

export default function CreatePost(props) {
   const dispatch = useDispatch();

   const [content, setContent] = useState('');
   const [pictures, setPictures] = useState([]);

   const onDrop = picture => {
     setPictures(picture);
   };

   function createPost() {
      console.log(content);
   }
   
   function handleTextChange(content) {
      setContent(content);
   }


   return (
      <div>
         <button onClick={() => createPost()}>Console log</button>
         young money
         {/* <ImageUploader
            withPreview={true}
            buttonText="Upload Image"
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
         /> */}
         <SunEditor 
            placeholder="Please type here..."
            width="80%"
            lang="en"
            // enable={true}
            onChange={handleTextChange}
            enableToolbar={true}
            setOptions={{
               height: 500,
               buttonList: buttonList.complex,
            }}
         />
      </div>
   )
}