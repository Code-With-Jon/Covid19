import React from 'react'
import Ticker from 'react-ticker'
var count;
function ScrollText() {

  function rand(count) {
     count = 0;

    if (count !== 0 && count === quotes.length){
      count = 0;
      return count
    } else count = count++
    return count
  }
  
return(
  <div style={{borderBottom: '1px solid black'}}>
    <Ticker >
        {({ index }) => (
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <img src="https://www.trackcorona.live/static/corona/images/svg/doctor.svg" alt="" height='50px' />
              {/* <div> */}
            <h1 style={{marginRight: '10vw'}}>{quotes[rand(count)]}</h1>
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