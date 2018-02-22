// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
const fns = require('./utils/functions');

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('justins tests', () => {
  test('changing the first of the text', () => {
    let text = fns.changeText()
    expect(text).toBe('my biggest beef with web development is that there are so few people with which to share your victories.')
  })
})