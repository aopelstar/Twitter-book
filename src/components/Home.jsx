import React, { Component } from 'react';
import Header from './Header';

export default class Home extends Component{
    // video tutorial modal
    // featured books
    // influential people
    // inspirational people
    // categories filter
    // add new book
    // search users to save tweets ???
    constructor(){
        super();
        this.state ={
            animateLoad: true,
        }
    }
    componentDidMount(){
        
    }
    render(){
        return(
            <div>
                <Header />
                <div className="searchContainer">
                    <div className="tweetSearch">
                        <h1>Search Tweets</h1>
                        <input type="text" onChange={() => { e => this.updateTweetSearch(e.target.value)}}/>
                    </div>
                    <div className="tweetCategories">
                        <div className="categories">

                        </div>
                        <div className="filter">

                        </div>
                    </div>
                </div>
                <div className="featuredContainer">

                    <div className="newBookButton">
                        <div className="newLine"></div>
                        <div className="newLine"></div>
                    </div>
                </div>
            </div>
        )
    }
}