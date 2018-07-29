import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Model from './Model';

class App extends Component {
  render() {
    return (
      <div className="App"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <div className="topnav">
          <a className="active" href="#home">Home</a>
          <a href="#news">Profile</a>
          <a href="#contact">Jobs</a>
          <a href="#about">About</a>
          <a><Model/></a>
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
