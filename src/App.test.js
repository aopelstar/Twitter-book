// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
const fns = require('./utils/functions');

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

//justins test
describe('removing the retweet tag from the text', () => {
  test('changing the first of the text', () => {
    let text = fns.changeText()
    expect(text).toBe('RT if you miss the Kid 🐐 ')
  })
  test('checking that it returns a value', () => {
    let text = fns.changeText()
    expect(text.length).toBeGreaterThan(0);
  })
  test('that the text is a string', () => {
    let text = fns.changeText()
    expect(typeof text).toBe('string')
  })
})