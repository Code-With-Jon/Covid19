import React from 'react'
import Ticker from 'react-ticker'
 
function ScrollText() {

  function rand(min, max) {
    var offset = min
    var range = (max - min) + 1
    var randomNumber = Math.floor(Math.random() * range) + offset
    return randomNumber
  }
return(
    <Ticker>
        {({ index }) => (
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <img src="https://www.trackcorona.live/static/corona/images/svg/doctor.svg" alt="" height='50px' />
              {/* <div> */}
            <h1 style={{marginRight: '10vw'}}>{quotes[rand(0, quotes.length - 1)]}</h1>
            {/* </div> */}
            {/* <div style={{padding: '5px'}}> */}
                
                {/* </div> */}
            </div>
        )}
    </Ticker>
)
}
export default ScrollText


const quotes = [
  'CALIFORNIA DECLARED STAY IN PLACE -',
  'ILLINOIS DECLARED STAY AT HOME -',
  'NEW YORK DECLARED STAY IN PLACE - ',
]