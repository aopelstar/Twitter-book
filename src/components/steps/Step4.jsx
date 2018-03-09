import React, { Component } from 'react';
import axios from 'axios';
import masonryLayout from '../../images/masonryLayout.svg'
import standardLayout from '../../images/standardLayout.svg'
import trash from '../../images/image.png'

export default class Step4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            bookTweets: [],
            yourTweets: true,
            searchName: ''
        }
    }
    componentDidMount() {
        axios.get('/api/selectedtweets').then(res => {
            this.setState({
                tweets: res.data
            })
        })
    }
    componentWillReceiveProps(props) {
        this.setState({
            tweets: props.bookTweets
        })
    }
    yourTweets() {
        this.setState({
            yourTweets: true,
        })
    }
    updateSearch(val) {
        this.setState({
            searchName: val
        })
    }
    Search(e) {
        let screenName = { screenName: this.state.searchName }
        axios.post("/api/searchedUser", screenName).then(res => {
            this.setState({
                tweets: res.data.data
            })
        })
    }
    render(props) {
        let yourTweets = this.state.tweets.map((e, i) => {
            return (
                <div key={i} className='SFtweets'>
                    <div className="tweetHead">
                        <img src={e.user_img} alt="" className='tweetUserImg' />
                        <div className="tweetTextContainer">
                            <div className="usernameAndScreenname">
                                <h1>{e.tweet_username}</h1>
                                <h2>@{e.tweet_screenname}</h2>
                            </div>
                            <p className='tweetText'>{e.tweet_text}</p>
                        </div>
                    </div>
                    <div className="media">
                        {e.tweet_img1 ? <img src={e.tweet_img1} alt="" className="tweetImg" /> : null}
                        {e.tweet_img2 ? <img src={e.tweet_img2} alt="" className="tweetImg" /> : null}
                    </div>
                    <div className="media">
                        {e.tweet_img3 ? <img src={e.tweet_img3} alt="" className="tweetImg" /> : null}
                        {e.tweet_img4 ? <img src={e.tweet_img4} alt="" className="tweetImg" /> : null}
                    </div>
                    {/* <button onClick={() => this.props.addTweetToBook(e)}>Add Tweet to book</button> */}
                    <button onClick={() => this.props.deleteTweetFromBook(e.tweet_id)} >
                        <img src={trash} alt="" className='trashCan' />
                    </button>
                    <br />
                </div>
            )
        })
        return (
            <div className="stepOneContainer">
                <div className="stepFourLayout">
                    <div className="containerLayout">
                        <div className={this.props.selectedLayout === 'standardTweetsList' ? 'standardLayout selectedLayout' : 'standardLayout'} onClick={() => this.props.handlePageLayout('standardTweetsList')}>
                            <div>Standard Layout</div>
                            <img src={standardLayout} alt="" />
                        </div>
                        <div className={this.props.selectedLayout === 'masonryTweetsList' ? 'masonryLayout selectedLayout' : 'masonryLayout'} onClick={() => this.props.handlePageLayout('masonryTweetsList')}>
                            <div>Masonry Layout</div>
                            <img src={masonryLayout} alt="" />
                        </div>
                    </div>
                    <div className="chosenTweetsContaniner">
                        <button onClick={() => this.yourTweets()}>Book tweets</button>
                        <input type="text" placeholder='Search a users handle' onChange={e => this.updateSearch(e.target.value)} />
                        <button onClick={() => this.Search()}>Search</button>
                        {this.state.yourTweets === true ? <h1 className='tweetsTitle'>Tweets for this book.</h1> : null}
                        {this.state.tweets.length > 0 && this.state.yourTweets === true ? yourTweets : <div className='noTweetsOption'>Search for tweets above</div>}
                    </div>
                    <button className='submitTweets'>Submit tweets</button>
                </div>
            </div>
        )
    }
}
