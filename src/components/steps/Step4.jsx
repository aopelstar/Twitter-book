import React, { Component } from 'react';
import axios from 'axios';

export default class Step4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }
    componentDidMount() {
        axios.get('/api/selectedtweets').then(res => {
            console.log(res.data)
            this.setState({
                tweets: res.data
            })
        })
    }
    render(props) {
        let mappedTweets = this.state.tweets.map((e, i) => {
            return (
                <div key={i} className='tweets'>
                    <img src={e.user_img} alt="" className="tweetProfileImg" />
                    <h1>{e.tweet_username}</h1>
                    <h2>{e.tweet_screenname}</h2>
                    <p>{e.tweet_text}</p>
                    <img src={e.tweet_img1 ? e.tweet_img1 : null } alt="" className="tweetImg"/>
                    <img src={e.tweet_img2 ? e.tweet_img2 : null } alt="" className="tweetImg"/>
                    <img src={e.tweet_img3 ? e.tweet_img3 : null } alt="" className="tweetImg"/>
                    <img src={e.tweet_img4 ? e.tweet_img4 : null } alt="" className="tweetImg"/> <br/>
                    <button>Add Tweet to book</button>
                    <br />
                </div>
            )
        })
        return (
            <div>
                <button onClick={() => this.props.handlePageLayout('standardTweetsList')}>Standard Layout</button>
                <button onClick={() => this.props.handlePageLayout('masonryTweetsList')}>Masonry Layout</button>
                {mappedTweets}
            </div>
        )
    }
}
