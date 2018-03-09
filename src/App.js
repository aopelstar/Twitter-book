import React, { Component } from 'react';
import './reset.css';
import './App.css';
import './components/Header.css';
import Routes from './routes';
import Header from './components/Header';


class App extends Component {
  render() {
    return (
      <div className="mainBody">
          {window.location.pathname === process.env.REACT_APP_HEADER_CHECK ? null : <Header />}
        {Routes}
      </div>
    );
  }
}

export default App
