import React, { Component } from 'react';
import "bootswatch/journal/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

import logo from './logo.svg';
import './App.css';

const PLACES = [
  { name: "Тель-Авив", zip: "61000", id: "293396" },
  { name: "Санкт-Петербург", zip: "191011", id: "519690" },
  { name: "Mamay", zip: "671210", id: "2013226" },
  { name: "Angarsk", zip: "665800", id: "2027667" },
  { name: "Irkutsk", zip: "664047", id: "2023469" }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  
  render() {
    
    const activePlace = this.state.activePlace;
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                React Simple Weather App
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
          <Grid>
            <Row>
              <Col md={4} sm={4}>
                <h3>Select a city</h3>
                <Nav
                  bsStyle="pills"
                  stacked
                  activeKey={activePlace}
                  onSelect={index => {
                    this.setState({ activePlace: index });
                  }}
                >
                  {PLACES.map((place, index) => (
                    <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                  ))}
                </Nav>
              </Col>
              <Col md={8} sm={8}>
                <WeatherDisplay key={activePlace} id={PLACES[activePlace].id} />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const id = this.props.id;
    const URL = "http://api.openweathermap.org/data/2.5/weather?id=" +
      id +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
        {/*<p>{JSON.stringify(weatherData)}</p>*/}
      </div>
    );
  }
}

export default App;
