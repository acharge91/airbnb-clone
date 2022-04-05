import React from 'react';
import GoogleMapReact from 'google-map-react'
import './App.css';
import Flat from './components/flat';
import Marker from './components/marker.js';






class App extends React.PureComponent {
  constructor(props) {
    super(props); (

      this.state = {
        flats: [],
        allFlats: [],
        slectedFlat: null,
        search: ""
      }
    )
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json")
      .then(response => response.json())
      .then((data) => {
        this.setState ({
          flats: data,
          allFlats: data
        });
      })
    }

  selectFlat = (flat) => {
    this.setState({
      slectedFlat: flat

    });

  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))

    });
  }

  render() {
    let center = {
      lat: 48.8566,
      lng: 2.3522
    }
    let zoom = 11


    if (this.state.slectedFlat) {
      center = {
        lat: this.state.slectedFlat.lat,
        lng: this.state.slectedFlat.lng
      }
      zoom = 14
    }

    return (
      <div className="app">
        <div className="main">
          <div className='search'>
            <input
              type="text"
              placeholder='search...'
              value={this.state.search}
              onChange={this.handleSearch}
            >
            </input>
          </div>
          <div className="flats">
            {this.state.flats.map(flat => {
              return <Flat flat={flat} key={flat.name} selectFlat={this.selectFlat}></Flat>
            })}
          </div>
        </div>
        <div className='map'>
          <GoogleMapReact
            center={center}
            zoom={ zoom }
        >
            {this.state.flats.map(flat => {
              return <Marker
                lat={flat.lat}
                lng={flat.lng}
                text={flat.price + flat.priceCurrency}
                key={flat.name}
                selected={flat === this.state.slectedFlat}
                />
            })}
        </GoogleMapReact>


        </div>
      </div>
    );
  }
}

export default App;
