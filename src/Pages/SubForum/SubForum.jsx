import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function(props) {

   useEffect( () => {
      console.log('mounted')
   }, [])


   //I need a posts collection and comment collection
   return (
      <div>
         <Link to={`${props.match.url}/create`} >
            Create a Post
         </Link>
         <p>

         {props.match.params.topic}
         </p>

         
      </div>
   )
}