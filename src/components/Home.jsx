import React, { Component } from 'react';
import Header from './Header'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
    // video tutorial modal
    // featured books
    // influential people
    // inspirational people
    // categories filter
    // add new book
    // search users to save tweets ???
    constructor() {
        super();
        this.state = {
            seachInput: '',
            fearturedBooks: [],
            tweets: []
        }
    }
    componentDidMount() {
        axios.get('/api/get-featured-books').then( res => {
            console.log(res.data)
            this.setState({
                fearturedBooks: res.data
            })
        })
        axios.get('/api/twitter').then( res => {
            console.log(res)
            this.setState({
                tweets: res.data
            })
        })
    }
    updateTweetSearch(val){
        this.setState({
            seachInput: val
        })
    }
    render() {
        let featuredBooks = this.state.fearturedBooks.map((e,i) => {
            return(
                <div key={i}>
                    <div>{e.bookname}</div>
                </div>
            )
        })
        return (
            <div>
                <Header />
                <div className="searchContainer">
                    <div className="tweetSearch">
                        <h1>Search Tweets</h1>
                        <input type="text" onChange={() => { e => this.updateTweetSearch(e.target.value) }} />
                    </div>
                    <div className="tweetCategories">
                        <div className="categories">

                        </div>
                        <div className="filter">

                        </div>
                    </div>
                </div>
                <div className="featuredContainer">
                    <div className="featuredbooks">
                        {featuredBooks}
                    </div>
                    <Link to="/newbook"><div className="newBookButton">
                        <div className="newLine"></div>
                        <div className="newLine hor"></div>
                    </div></Link>
                </div>
            </div>
        )
    }
}