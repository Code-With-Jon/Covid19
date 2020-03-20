import React, {useState, useEffect} from 'react';

export default function(props) {

   useEffect( () => {
      console.log('mounted')
   }, [])

   //I need a subTopic collection and posts collection
   return (
      <div>
         {/* {props.location.state.name} */}
         
      </div>
   )
}