import React from 'react';
import './Topics.css'
import {Link} from 'react-router-dom';
import topicsRoutes from '../../utils/topicsRoutes';

export default function Topics(props) {


   return (
      <div>
         {topicsRoutes.map((topic, index) => {
            return (
               <Link key={index} to={topic.route} >
                  <div style={{border: '1px solid purple'}}>
                     <h2>{topic.name}</h2>
                     <h4>{topic.description}</h4>
                  </div>
               </Link>
            )
         })}
      </div>
   )
}