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
            searchInput: '',
            fearturedBooks: [],
            tweets: []
        }
    }
    async componentDidMount() {
        await axios.get('/api/get-featured-books').then( res => {
            console.log(res.data)
            this.setState({
                fearturedBooks: res.data
            })
        })
        await axios.get('/api/twitter').then( res => {
            console.log(res)
            this.setState({
                tweets: res.data.data
            })
        })
    }
    updateTweetSearch(val){
        this.setState({
            searchInput: val
        })
    }
    handleSearch(){
        var screenName = {
            screenName: this.state.searchInput
        }
        axios.post("/api/searchedUser", screenName).then(res => {
            console.log(res)
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
        let yourTweets = this.state.tweets.map((e,i) => {
            return (
                <div key={i} className='tweets'> 
                    <h1>{e.user.name}</h1>
                    <h2>{e.user.screen_name}</h2>
                    <p>{e.text}</p>
                    <br/>
                </div>
            )
        })
        return (
            <div>
                <Header />
                <div className="searchContainer">
                    <div className="tweetSearch">
                        <h1>Search Tweets</h1>
                        <input type="text" onChange={ e => this.updateTweetSearch(e.target.value)} />
                        <button onClick={() => this.handleSearch()}>click this</button>
                        {yourTweets}
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