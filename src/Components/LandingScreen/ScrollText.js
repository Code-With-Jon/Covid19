import React from 'react'
import Ticker from 'react-ticker'
 
const ScrollText = () => (
    <Ticker>
        {({ index }) => (
            <>
                <h1>For more coronavirus information, call the CO HELP line at 303-389-1687 or 1-877-462-2911</h1>
                <img src="https://www.trackcorona.live/static/corona/images/svg/doctor.svg" alt="" height='50px' />
            </>
        )}
    </Ticker>
)
 
export default ScrollText
