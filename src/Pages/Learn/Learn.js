import React from 'react'
import IframeComponent from '../../Components/Map';
import './Learn.css';
// import "node_modules/video-react/dist/video-react.css";
import {Helmet} from 'react-helmet'

export default function Learn(props) {
return(
<div id="learn" style={{backgroundColor: 'black', height: '70%'}}>
<Helmet>
    <title>Learn About Covid 19</title>
    <meta name="description" content="Read and watch information about Covid 19 and how to stay safe" />
  </Helmet>
    <div className="learn-header-container">
        <div className="learn-header-text-container">
            <h1 style={{color: 'white', fontSize: 62}}>Learn About Covid 19</h1>
        </div>

        <div className="learn-video">
            <IframeComponent src='https://www.youtube.com/embed/78jLBNSqc3g'
                // frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
                height="100%"
                // width="100%"
            />
        </div>
    </div>

    <div style={{backgroundColor: 'white', height: '20%', width: '100%', paddingBottom: '2vh'}}>
       
        
        {about.map((item, index) => {
            return (
                <div style={{paddingTop: '2vh', width: '70%', marginLeft: "auto", marginRight: 'auto'}}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                </div>
            )
        })}
    </div>
</div>
)
}


const about = [
    {
        title: 'What is coronavirus disease 2019 (COVID-19)?',
        description: 'Coronavirus disease 2019 (COVID-19) is a respiratory illness that can spread from person to person. The virus that causes COVID-19 is a novel coronavirus that was first identified during an investigation into an outbreak in Wuhan, China.'
    },
    {
        title: 'How does COVID-19 spread? ',
        description: 'The virus that causes COVID-19 probably emerged from an animal source, but is now spreading from person to person. The virus is thought to spread mainly between people who are in close contact with one another (within about 6 feet) through respiratory droplets produced when an infected person coughs or sneezes. It also may be possible that a person can get COVID-19 by touching a surface or object that has the virus on it and then touching their own mouth, nose, or possibly their eyes, but this is not thought to be the main way the virus spreads. Learn what is known about the spread of newly emerged coronaviruses at https://www.cdc.gov/coronavirus/2019-ncov/about/transmission.html. '
    },
    {
        title: 'What are the symptoms of COVID-19?',
        description: 'Patients with COVID-19 have had mild to severe respiratory illness with symptoms of • fever • cough • shortness of breath'
    },
    {
        title: 'What are severe complications from this virus? ',
        description: 'Some patients have pneumonia in both lungs, multi-organ failure and in some cases death. '
    },
    {
        title: 'How can I help protect myself? ',
        description: 'People can help protect themselves from respiratory illness with everyday preventive actions.   • Avoid close contact with people who are sick. • Avoid touching your eyes, nose, and mouth with unwashed hands. • Wash your hands often with soap and water for at least 20 econds. Use an alcohol-based hand sanitizer that contains at least 60% alcohol if soap and water are not available.'
    },
    {
        title: 'If you are sick, to keep from spreading respiratory illness to others, you should:',
        description: 'Stay home when you are sick. • Cover your cough or sneeze with a tissue, then throw the tissue in the trash. • Clean and disinfect frequently touched objects and surfaces'
    },
    {
        title: 'What should I do if I recently traveled from an area with ongoing spread of COVID-19?',
        description: 'If you have traveled from an affected area, there may be restrictions on your movements for up to 2 weeks. If you develop symptoms during that period (fever, cough, trouble breathing), seek medical advice. Call the office of your health care provider before you go, and tell them about your travel and your symptoms. They will give you instructions on how to get care without exposing other people to your illness. While sick, avoid contact with people, don’t go out and delay any travel to reduce the possibility of spreading illness to others.'
    },
    {
        title: 'Is there a vaccine? ',
        description: 'There is currently no vaccine to protect against COVID-19. The best way to prevent infection is to take everyday preventive actions, like avoiding close contact with people who are sick and washing your hands often. '
    },
    {
        title: 'Is there a treatment? ',
        description: 'There is no specific antiviral treatment for COVID-19. People with COVID-19 can seek medical care to help relieve symptoms. '
    },

]