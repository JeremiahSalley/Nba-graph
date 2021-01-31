
import React, {Component} from 'react';
import './App.css';
// import LineGraph from './Components/lineGraph'
import SearchBar from './Components/searchBar'
// import Count from './Components/count'
// import RadarGraph from './Components/Radar-Graph'

class App extends Component {
  render(){
    return (
      <div className="App">
        <SearchBar />
        {/* <RadarGraph /> */}
        {/* <Count /> */}
        {/* <LineGraph /> */}
  
      </div>
    );

  }
  
}

export default App;


