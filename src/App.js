import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Header from './components/Header';
import Routes from './routes';
import Redux from 'react-redux';


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
