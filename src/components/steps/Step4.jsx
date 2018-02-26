import React from 'react';


export default function Step4(props) {
    const tweets = props.listOfTweets
    return (
        <div>
            {tweets}
            <button onClick={ () => props.handlePageLayout('standardTweetsList')}>Standard Layout</button>
            <button onClick={ () => props.handlePageLayout('masonryTweetsList')}>Masonry Layout</button>
        </div>
    )
}

