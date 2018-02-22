import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Routes from './routes';
import Header from './components/Header';


class App extends Component {

  render() {
    return (
      <div className="mainBody">
          {window.location.href == "http://localhost:3000/#/" ? null : <Header />}
        {Routes}
      </div>
    );
  }
}

export default App
