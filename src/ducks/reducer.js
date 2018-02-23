import axios from 'axios';

//data
const initialState = {
    twitterObj: {},
    user: {},
    book: {}
}



//types

const GET_USER_INFO = "GET_USER_INFO";
const GET_BOOK_INFO = "GET_BOOK_INFO";



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

export function getBookInfo(userId, bookId) {
    let bookData = axios.get(`/api/book/${userId}/${bookId}`).then(book => {
        return book.data
    })
    return {
        type: GET_BOOK_INFO,
        payload: bookData
    }
}



//switch

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + "_FULFILLED":
            return Object.assign({}, state, { user: action.payload })
        case GET_BOOK_INFO + "_FULFILLED":
            return Object.assign({}, state, { book: action.payload })
        default: return state
    }
}