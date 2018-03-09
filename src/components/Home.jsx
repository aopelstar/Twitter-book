import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import small from '../images/8x8book.svg';
import large from '../images/14x11book.svg';
import { connect } from 'react-redux';
import { getBookTweets, getUserInfo } from '../ducks/reducer';
import Modal from 'react-modal';

const modalStyle = {
    overlay: {
        background: "rgba(0,0,0,.25)"
    },
    content: {
        height: "400px",
        width: "400px",
        background: "white",
        margin: "auto",
    }
}

class Home extends Component {
    constructor() {
        super();
        this.state = {
            searchInput: '',
            featuredBooks: [],
            tweets: [],
            searchedTweets: [],
            yourTweets: true,
            user: {},
            quantity: 0,
            booktweets: []
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    async componentDidMount(props) {
        await this.props.getUserInfo().then(res => {
            this.setState({
                user: res.value.data
            })
        })
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
        await this.props.getBookTweets()
    }

    componentWillReceiveProps(nextProps) {
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
            console.log(res.data.data)
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
        var cartBody = {
            book_id: e.book_id
            , quantity: this.state.quantity
            , book_price: e.book_price
            , user_id: this.state.user.auth_id
        }

        axios.post('/api/addtocart', cartBody).then(cart => {
            this.setState({
                modalIsOpen: false,
                quantity: 0
            })
        })
    }

    handleAddTweet(i) {
        let tweet = i
        let tweetImg = tweet.user.profile_image_url.replace("normal", "400x400")
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
            tweet_id: tweet.id
        }
        axios.post('/api/updatetweets', tweetBody).then(res => {
        })
        this.props.getBookTweets();
    }

    handleRemoveTweet(i) {
        axios.delete('/api/homeremovetweet/' + i.id).then(res => {
            this.props.getBookTweets();
        })
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        })
    }

    increase() {
        var increment = this.state.quantity + 1
        this.setState({
            quantity: increment
        })
    }

    decrease() {
        var decrement = this.state.quantity - 1
        this.setState({
            quantity: decrement
        })
    }

    render() {

        let featuredBooks = this.state.featuredBooks.length > 0 ? this.state.featuredBooks.map((e, i) => {
            let bookColor = e.book_color ? e.book_color : "No book color chosen yet."
            let bookSize = e.book_size === "small" ? "8 x 8" : e.book_size === "medium" ? "10 x 10" : e.book_size === "large" ? "14 x 11" : "No book size chosen yet."
            let bookSubTitle = e.book_subtitle ? e.book_subtitle : null
            let bookTitle = e.book_title ? e.book_title : "No book title chosen yet."
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
                        <button onClick={() => this.openModal()}>Purchase Now</button>
                        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyle} >
                            <div className='checkoutQuantity'>
                                <h1>Price: <strong>{e.book_price}</strong></h1>
                                <div className="field" id="quantityfield">
                                    <div className='quantityDisplay'>
                                        <input id="quantity" placeholder="Qty." min="0" type="number" disabled="disabled" value={this.state.quantity}></input>
                                        <div className="quantityControl">
                                            <button onClick={this.increase}>+</button>
                                            <button onClick={this.decrease}>-</button>
                                        </div>
                                    </div>
                                </div>
                                <button className="addToCart" onClick={() => this.addToCart(e)}>Add to cart</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
            )
        }) : null
        let yourTweets = this.state.tweets.length > 0 ? this.state.tweets.map((e, i) => {
            var homeTweetButton = false
            console.log(homeTweetButton);
            var buttonToggle = this.props.bookTweets.map((x,y)=>{
                if(x.twitter_tweet_id == e.id){
                    homeTweetButton = true
                }
                homeTweetButton = false
            })
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
                    {homeTweetButton ? <button key={i} className="homeTweetButton" id='remove' onClick={() => this.handleRemoveTweet(e)}></button> : <button key={i} className="homeTweetButton" onClick={() => this.handleAddTweet(e)}>+Add</button>}
                </div>
            )
        }) : <div className="homePrompt">You don't have any personal tweets...</div>

        let searchedTweets = this.state.searchedTweets.length > 0 ? this.state.searchedTweets.map((e, i) => {
            var homeTweetButton = false
            this.props.bookTweets.map((x, y) => {
                if (e.id != x.twitter_tweet_id) {
                    homeTweetButton = true
                }
            })
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
                    {homeTweetButton ? <button key={i} className="homeTweetButton" onClick={() => this.handleAddTweet(e)}>+Add</button> : <button key={i} className="homeTweetButton" id='remove' onClick={() => this.handleRemoveTweet(e)}>+Add</button>}
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

function mapStateToProps(state) {
    return {
        bookTweets: state.bookTweets,
    }
}


export default connect(mapStateToProps, { getBookTweets, getUserInfo })(Home);