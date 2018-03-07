import axios from 'axios';

//data
const initialState = {
    twitterObj: {},
    user: {},
    setBook: {},
    bookTweets: []
}



//types

const GET_USER_INFO = "GET_USER_INFO";
const GET_SETBOOK = "GET_SETBOOK";
const GET_BOOKTWEETS = "GET_BOOKTWEETS";



//action builder
export function getUserInfo() {
    let promise = axios.get('auth/me')
    promise.then(user => {
        return user.data
    })
    return {
        type: GET_USER_INFO,
        payload: promise
    }
}
export function setBook(book){
    return{
        type: GET_SETBOOK,
        payload: book
    }
}

export function getBookTweets(){
    let bookTweetData = axios.get('/api/selectedtweets').then(tweets=>{
        console.log(tweets);
        return tweets.data
    })
    return {
        type: GET_BOOKTWEETS,
        payload: bookTweetData
    }
}




//switch

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + "_FULFILLED":
            return Object.assign({}, state, { user: action.payload })
        case GET_SETBOOK:
            return Object.assign({}, state, { setBook: action.payload })
        case GET_BOOKTWEETS + "_FULFILLED":
            return Object.assign({}, state, {bookTweets: action.payload})
        default: return state
    }
}