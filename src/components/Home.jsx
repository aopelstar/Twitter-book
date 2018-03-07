import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import small from '../images/8x8book.svg';
import large from '../images/14x11book.svg';

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
            featuredBooks: [],
            tweets: [],
            searchedTweets: [],
            yourTweets: true,
        }
    }

    async componentDidMount() {
        await axios.get('/api/get-featured-books').then(res => {
            this.setState({
                featuredBooks: res.data
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

    handleClickSearch(e) {
        axios.post('/api/searchedUser', { screenName: e }).then(res => {
            this.setState({
                searchedTweets: res.data.data,
                yourTweets: false
            })
        })
    }

    changeTweets() {
        this.setState({
            yourTweets: true
        })
    }

    addToCart(e) {
        axios.post('/api/addtocart', {book: e}).then(cart=>{
        })
    }

    handleAddTweet(i) {
        let tweet = i
        let tweetImg = i.user.profile_image_url.replace("normal", "400x400")
        var text = tweet.text;
        var text1 = text.replace(/https.*$/g, '')
        var text2 = text1.replace(/^(.*?): /g, '')
        var tweetBody = {
            img: tweetImg,
            userName: tweet.user.name,
            userScreenName: tweet.user.screen_name,
            text: text2,
            tweet_date: tweet.created_at,
            mediaOne: tweet.extended_entities ? tweet.extended_entities.media[0] ? tweet.extended_entities.media[0].media_url : null : null,
            mediaTwo: tweet.extended_entities ? tweet.extended_entities.media[1] ? tweet.extended_entities.media[1].media_url : null : null,
            mediaThree: tweet.extended_entities ? tweet.extended_entities.media[2] ? tweet.extended_entities.media[2].media_url : null : null,
            mediaFour: tweet.extended_entities ? tweet.extended_entities.media[3] ? tweet.extended_entities.media[3].media_url : null : null,
        }
        axios.post('/api/updatetweets', tweetBody).then(res => {
        })
    }

    render() {
        let featuredBooks = this.state.featuredBooks.length > 0 ? this.state.featuredBooks.map((e, i) => {
            let backText = e.back_text ? e.back_text : "No back text chosen yet."
            let bookColor = e.book_color ? e.book_color : "No book color chosen yet."
            let bookSize = e.book_size === "small" ? "8 x 8" : e.book_size === "medium" ? "10 x 10" : e.book_size === "large" ? "14 x 11" : "No book size chosen yet."
            let bookSubTitle = e.book_subtitle ? e.book_subtitle : "No book subtitle chosen yet."
            let bookTextColor = e.book_text_color ? e.book_text_color : "No book text color chosen yet."
            let bookTitle = e.book_title ? e.book_title : "No book title chosen yet."
            let pagesFormat = e.pages_format ? e.pages_format : "No page format chosen yet."
            let image = e.book_size === "large" ? large : small
            return (<div className="draftContainer" key={i}>
                <div className="accountDraft">
                    <div className="draftImgContainer">
                        <img src={image} alt={bookTitle} style={{ background: `${bookColor}` }} className="draftImg" />
                        <div className="draftSize">{bookSize}</div>
                    </div>
                    <div className="draftNames">
                        <div className="draftTitle">{bookTitle}</div>
                        <div className="draftSubTitle">{bookSubTitle}</div>
                    </div>
                    <div className="draftButtons">
                        <button onClick={() => this.addToCart(e)}>Add to Cart</button>
                    </div>
                </div>
            </div>
            )
        }) : null

        let yourTweets = this.state.tweets.length > 0 ? this.state.tweets.map((e, i) => {
            var text = e.text;
            var text1 = text.replace(/https.*$/g, '')
            var text2 = text1.replace(/^(.*?): /g, '')
            return (
                <div key={i} className='tweets'>
                    <img src={e.user.profile_image_url} alt={e.user.name} className='tweetUserImg' />
                    <div className="tweetHead">
                        <div className="tweetTextContainer">
                            <div className="usernameAndScreenname">
                                <h1>{e.user.name}</h1>
                                <h2>@{e.user.screen_name}</h2>
                            </div>
                            <div className='tweetText'>{text2}</div>
                        </div>
                        <div className="media">
                            {e.extended_entities ? e.extended_entities.media[0] ? <img src={e.extended_entities.media[0].media_url} alt="" className="tweetImg" /> : null : null}
                            {e.extended_entities ? e.extended_entities.media[1] ? <img src={e.extended_entities.media[1].media_url} alt="" className="tweetImg" /> : null : null}
                        </div>
                        <div className="media">
                            {e.extended_entities ? e.extended_entities.media[2] ? <img src={e.extended_entities.media[2].media_url} alt="" className="tweetImg" /> : null : null}
                            {e.extended_entities ? e.extended_entities.media[3] ? <img src={e.extended_entities.media[3].media_url} alt="" className="tweetImg" /> : null : null}
                        </div>
                    </div>
                    <button onClick={() => this.handleAddTweet(i)}>+Add</button>
                </div>
            )
        }) : <div className="homePrompt">You don't have any personal tweets...</div>
        let searchedTweets = this.state.searchedTweets.length > 0 ? this.state.searchedTweets.map((e, i) => {
            var text = e.text;
            var text1 = text.replace(/https.*$/g, '')
            var text2 = text1.replace(/^(.*?): /g, '')
            return (
                <div key={i} className='tweets'>
                    <img src={e.user.profile_image_url} alt={e.user.name} className='tweetUserImg' />
                    <div className="tweetHead">
                        <div className="tweetTextContainer">
                            <div className="usernameAndScreenname">
                                <h1>{e.user.name}</h1>
                                <h2>@{e.user.screen_name}</h2>
                            </div>
                            <div className='tweetText'>{text2}</div>
                        </div>
                        <div className="media">
                            {e.extended_entities ? e.extended_entities.media[0] ? <div style={
                                { background: `${e.extended_entities.media[0].media_url}` }} className="tweetImg"></div> : null : null}
                            {e.extended_entities ? e.extended_entities.media[1] ? <div style={
                                { background: `${e.extended_entities.media[1].media_url}` }} className="tweetImg"></div> : null : null}
                        </div>
                        <div className="media">
                            {e.extended_entities ? e.extended_entities.media[2] ? <div style={
                                { background: `${e.extended_entities.media[2].media_url}` }} className="tweetImg"></div> : null : null}
                            {e.extended_entities ? e.extended_entities.media[3] ? <div style={
                                { background: `${e.extended_entities.media[3].media_url}` }} className="tweetImg"></div> : null : null}
                        </div>
                    </div>
                    <button onClick={() => this.handleAddTweet(i)}>+Add</button>
                </div>
            )
        }) : <div className="homePrompt">Try a different search. That one didn't work...</div>
        return (
            <div className='homeContainer'>
                <div className="searchContainer">
                    <div className="tweetSearch">
                        <h1 className="homeTitle">Find and Add Tweets to Your Book</h1>
                        <div className="searchBody">
                            <input type="text" placeholder="Search" onChange={e => this.updateTweetSearch(e.target.value)} />
                            <button onClick={() => this.handleSearch()}>Find Tweets</button>
                            <button onClick={() => this.changeTweets()}>Your Tweets</button>
                        </div>
                    </div>
                    {this.state.yourTweets ? yourTweets : searchedTweets}
                </div>
                <div className="homeRight">
                    <div className="featuredContainer">
                        <h1 className="homeTitle">Featured Books</h1>
                        <div className="featuredbooks">
                            {featuredBooks}
                        </div>
                    </div>
                    <div className="homeFiltersContainer">
                        <h1 className="homeTitle">Popular Searches</h1>
                        <div className="homeFilters">
                            <button onClick={() => this.handleClickSearch('justinbieber')} className="homeFilterButton">Justin Bieber</button>
                            <button onClick={() => this.handleClickSearch('hereKANYEWEST')} className="homeFilterButton">Kanye West</button>
                            <button onClick={() => this.handleClickSearch('realDonaldTrump')} className="homeFilterButton">Donald Trump</button>
                            <button onClick={() => this.handleClickSearch('katyperry')} className="homeFilterButton">Katy Perry</button>
                            <button onClick={() => this.handleClickSearch('BarackObama')} className="homeFilterButton">Barack Obama</button>
                            <button onClick={() => this.handleClickSearch('ladygaga')} className="homeFilterButton">Lady Gaga</button>
                            <button onClick={() => this.handleClickSearch('rihanna')} className="homeFilterButton">Rihanna</button>
                            <button onClick={() => this.handleClickSearch('ArianaGrande')} className="homeFilterButton">Ariana Grande</button>
                            <button onClick={() => this.handleClickSearch('ddlovato')} className="homeFilterButton">Demi Lovato</button>
                            <button onClick={() => this.handleClickSearch('ESPN')} className="homeFilterButton">ESPN</button>
                            <button onClick={() => this.handleClickSearch('jimmyfallon')} className="homeFilterButton">Jimmy Fallon</button>
                            <button onClick={() => this.handleClickSearch('KingJames')} className="homeFilterButton">Lebron James</button>
                            <button onClick={() => this.handleClickSearch('Oprah')} className="homeFilterButton">Oprah Winfrey</button>
                            <button onClick={() => this.handleClickSearch('taylorswift13')} className="homeFilterButton">Taylor Swift</button>
                            <button onClick={() => this.handleClickSearch('jtimberlake')} className="homeFilterButton">Justin Timberlake</button>
                            <button onClick={() => this.handleClickSearch('wizkhalifa')} className="homeFilterButton">Wiz Khalifa</button>
                        </div>
                    </div>
                </div>
                <Link to="/newbook"><div className="newBookButton">+</div></Link>
            </div>
        )
    }
}