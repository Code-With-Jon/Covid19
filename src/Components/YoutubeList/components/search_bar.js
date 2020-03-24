import React, { Component } from 'react'; //Always need in JSX files
import { Input } from 'semantic-ui-react'
// Create the HTML to return for the input
class SearchBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <div className="search-bar" style={{margin: "20px", textAlign: "center"}}>
        <Input icon='search' focus placeholder='Search...' value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} style = {{ width: "40%" }}/>
        {/* <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          style = {{ width: "75%" }}
        /> */}
      </div>
    );
  }
}

//We need to export to index.js to display
export default SearchBar;
//means any file that imports searchBar
//will only get the searchBar component
