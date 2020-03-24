import React from 'react'
import _ from 'lodash';

import ReactDOM from 'react-dom';
// import YTSearch from 'youtube-api-search';
import searchYoutube from 'youtube-api-v3-search';
import '../../App.css'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA';

export default class YoutubeList extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        videos: [],
        selectedVideo: null
      };
  
     
      this.videoSearch({
        q:'nbc',
        part:'snippet',
        type:'video'
      });
    }
  
    videoSearch = async ({q: q, part: part, type: type})  => {
      //  searchYoutube( API_KEY, options);
       
        let result = await searchYoutube(API_KEY,{q: q, part: part, type: type});
        console.log(result)
      
        this.setState({
          videos: result.items,
          selectedVideo: result.items[0]
        }); //Same as this.setState({ videos : videos })
      
    }
  
    render() {
      const videoSearch = _.debounce(term => {
        this.videoSearch({q: term,  part:'snippet', type:'video'});
      }, 300);
  
      return (
        <div>
          <h5>Youtube Search:</h5><SearchBar onSearchTermChange={videoSearch} />
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
            videos={this.state.videos}
          />
        </div>
      );
    }
  }