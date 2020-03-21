import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addPost} from '../../redux/actions/postActions';
import ImageUploader from "react-images-upload";

export default function CreatePost(props) {
   const dispatch = useDispatch();

   const [pictures, setPictures] = useState([]);

   const onDrop = picture => {
     setPictures(picture);
   };

   function createPost() {
      console.log(pictures);
   }


   return (
      <div>
         <button onClick={() => createPost()}>Console log</button>
         young money
         <ImageUploader
            withPreview={true}
            buttonText="Upload Image"
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
         />
      </div>
   )
}