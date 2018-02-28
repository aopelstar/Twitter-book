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


//Andrew's test
describe('just some tests for my functions', ()=>{

  test('checking to see if a user exists', ()=> {
    let user = fns.userExist();
    expect(user).toBe("Juan Castro")
  })

  test('checking that user is returned as text', ()=> {
    let user = fns.userExist();
    expect(typeof user).toBe('string');
  })

  test('check that parameters are in an array', () => {
    let params = fns.isAnArray();
    expect(Array.isArray(params)).toBe(true)
  })

  test('check the array is 6 elements', () => {
    let params = fns.isAnArray();
    expect(params.length).toEqual(6)
  })

  test('that the image size is correct', () => {
    let image = fns.imageSize();
    expect(image).toBe("profilepic+400x400")
  })

})

//Dan's test
describe('currency conversion tests', () =>{

  test('is returned result a number', () => {
    let currency = fns.currencyConversion(1900.00);
    expect(typeof currency).toBe('number');
  })

  test('is returned result the correct result', ()=>{
    let currency = fns.currencyConversion(115.55);
    expect(currency).toBe(11555)
  })

  test('is returned result set to the correct precision of decimal points', ()=>{
    let currency = fns.currencyConversion(1.645);
    expect(currency).toBe(164)
  })

})

describe('changing quantities in cart function in backend', ()=>{

  test('is returned result the correct result', ()=>{
    var cart = [{user_id:1, book_id:2, quantity:3}, {user_id:1, book_id:3, quantity:2}, {user_id:2, book_id:2, quantity:3}]
  })
})