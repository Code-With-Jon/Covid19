import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";


export default class Topics extends React.Component{

    handleClick = (index) => {
        console.log(index)
            if( index === 0){
                return <Redirect to='/general' />
            }
        
    }

    render(){
        return(
            <div >
                <div>
                {topics.map((topic, index) => {
                    return (
                        <div key={index} onClick={() => this.handleClick(index)} style={{border: '1px solid purple'}}>
                            <h2>{topic.name}</h2>
                            <h4>{topic.description}</h4>
                        </div>
                    )
                })
            }
            </div>
        </div>
        )
    }
}

const topics = [
    {
        name: 'General',
        description: 'Share your stories dealing with Covid 19 lockdowns, family, ect.'
    },
    {
        name: 'Pre-Diagnoses',
        description: 'Talk about symptoms, processes, and other relavent topics'
    },
    {
        name: 'Post-Diagnoses',
        description: 'Talk about testing, symptoms, and challenges'
    },
    {
        name: 'Personal Loss',
        description: 'If you have lost someone to Covid 19, find you support here'
    },
    {
        name: 'Job/Income Loss',
        description: 'Talk about financial effects Covid 19 has had on you'
    },
    {
        name: 'Economy Outlook',
        description: 'Share your outlook'
    },
]