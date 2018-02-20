import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {Routes}
      </div>
    );
  }
}

export default App
