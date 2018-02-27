import React, { Component } from 'react';
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
            tweets: [],
            searchedTweets: [],
            yourTweets: true,
        }
    }
    async componentDidMount() {
        await axios.get('/api/get-featured-books').then(res => {
            this.setState({
                fearturedBooks: res.data
            })
        })
        await axios.get('/api/twitter').then(res => {
            this.setState({
                tweets: res.data.data
            })
        })
    }
    updateTweetSearch(val) {
        this.setState({
            searchInput: val
        })
    }
    handleSearch() {
        var screenName = {
            screenName: this.state.searchInput
        }
        axios.post("/api/searchedUser", screenName).then(res => {
            this.setState({
                searchedTweets: res.data.data,
                yourTweets: false
            })
        })
    }
    changeTweets(){
        this.setState({
            yourTweets: true
        })
    }
    render() {
        let featuredBooks = this.state.fearturedBooks.map((e, i) => {
            return (
                <div key={i}>
                    <div>{e.bookname}</div>
                </div>
            )
        })
        let yourTweets = this.state.tweets.map((e, i) => {
            var text = e.text;
            var text1 = text.replace(/https.*$/g, '')
            var text2 = text1.replace(/^(.*?): /g, '')
            return (
                <div key={i} className='tweets'>
                    <img src={e.user.profile_image_url} alt="" />
                    <h1>{e.user.name}</h1>
                    <h2>{e.user.screen_name}</h2>
                    <p>{text2}</p>
                    <img src={e.extended_entities ? e.extended_entities.media[0] ? e.extended_entities.media[0].media_url : null : null} alt="" className="tweetImg"/>
                    <img src={e.extended_entities ? e.extended_entities.media[1] ? e.extended_entities.media[1].media_url : null : null} alt="" className="tweetImg"/>
                    <img src={e.extended_entities ? e.extended_entities.media[2] ? e.extended_entities.media[2].media_url : null : null} alt="" className="tweetImg"/>
                    <img src={e.extended_entities ? e.extended_entities.media[3] ? e.extended_entities.media[3].media_url : null : null} alt="" className="tweetImg"/>
                    <br />
                </div>
            )
        })
        let searchedTweets = this.state.searchedTweets.map((e, i) => {
            var text = e.text;
            var text1 = text.replace(/https.*$/g, '')
            var text2 = text1.replace(/^(.*?): /g, '')
            return (
                <div key={i} className="tweets">
                    <img src={e.user.profile_image_url} alt="" />
                    <h1>{e.user.name}</h1>
                    <h2>{e.user.screen_name}</h2>
                    <p>{text2}</p>
                    <br/>
                </div>
            )
        })
        return (
            <div>
                <div className="searchContainer">
                    <div className="tweetSearch">
                        <h1>Search Tweets</h1>
                        <input type="text" onChange={e => this.updateTweetSearch(e.target.value)} />
                        <button onClick={() => this.handleSearch()}>click this</button>
                        <button onClick={() => this.changeTweets()}>Your Tweets</button>
                        {this.state.yourTweets ? yourTweets : searchedTweets}
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