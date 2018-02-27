import React from 'react';
import axios from 'axios';

export default function Step4(props) {
    const tweets = props.listOfTweets
    axios.get('/api/selecetedtweets').then( res => {
        console.log(res)
    })  
    return (
        <div>
            {tweets}
            <button onClick={ () => props.handlePageLayout('standardTweetsList')}>Standard Layout</button>
            <button onClick={ () => props.handlePageLayout('masonryTweetsList')}>Masonry Layout</button>
        </div>
    )
}

