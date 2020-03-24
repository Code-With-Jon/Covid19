import React from 'react'
import Ticker from 'react-ticker'
 let randomNumber;
function ScrollText() {

  function rand(min, max, rand) {
    var offset = min
    var range = (max - min) + 1
    randomNumber = Math.floor(Math.random() * range) + offset
    if (rand === randomNumber) {
      rand(0, quotes.length - 1, rand)
    }
    return randomNumber
  }
return(
  <div style={{borderBottom: '1px solid black'}}>
    <Ticker >
        {({ index }) => (
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <img src="https://www.trackcorona.live/static/corona/images/svg/doctor.svg" alt="" height='50px' />
              {/* <div> */}
            <h1 style={{marginRight: '10vw'}}>{quotes[rand(0, quotes.length - 1, rand)]}</h1>
            {/* </div> */}
            {/* <div style={{padding: '5px'}}> */}
                
                {/* </div> */}
            </div>
        )}
    </Ticker>
    </div>
)
}
export default ScrollText


const quotes = [
  'CALIFORNIA DECLARED STAY AT HOME ORDER-',
  'ILLINOIS DECLARED STAY AT HOME ORDER -',
  'NEW YORK DECLARED STAY AT HOME ORDER - ',
]