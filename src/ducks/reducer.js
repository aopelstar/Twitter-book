import axios from 'axios';

//data
const initialState = {
    twitterObj: {},
    user: {},
    setBook: {}
}



//types

const GET_USER_INFO = "GET_USER_INFO";
const GET_SETBOOK = "GET_SETBOOK";



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




//switch

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + "_FULFILLED":
            return Object.assign({}, state, { user: action.payload })
        case GET_SETBOOK:
            return Object.assign({}, state, { setBook: action.payload })
        default: return state
    }
}