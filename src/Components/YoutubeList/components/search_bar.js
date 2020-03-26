import React, { useEffect, useState} from 'react'; //Always need in JSX files
import { Input } from 'semantic-ui-react'
// Create the HTML to return for the input
export default function SearchBar(props) {
  const [term, setTerm] = useState('')
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth <= 576)

  useEffect(() => {
    window.addEventListener('resize', () => handleResize());
    return  () => {
        window.removeEventListener('resize', () => handleResize());
    }
  }, [])

  function handleResize() {
    setMobileScreen(window.innerWidth <= 576)
  }


  function onInputChange(term) {
    setTerm( term );
    props.onSearchTermChange(term);
  }

    return (
      <div style={{width: !mobileScreen ? '40%' : '90%'}}>
        {!mobileScreen ?
      <div className="search-bar" style={{marginTop: "20px",marginTop: "20px",textAlign: "center"}}>
        <Input icon='search' focus placeholder='Search...' value={term}
          onChange={event => onInputChange(event.target.value)} style={{ width: "100%" }}/>
        {/* <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          style = {{ width: "75%" }}
        /> */}
      </div>
        :
      <div style={{marginTop: "20px", marginBottom: "20px",textAlign: "center", width: '100%'}}>
      <Input icon='search' focus placeholder='Search...' value={term}
        onChange={event => onInputChange(event.target.value)} style={{ width: "100%" }}/>
      {/* <input
        value={this.state.term}
        onChange={event => this.onInputChange(event.target.value)}
        style = {{ width: "75%" }}
      /> */}
      </div>
          } 
      </div>
    )
  }


//We need to export to index.js to display

//means any file that imports searchBar
//will only get the searchBar component
