import React from 'react';


export default function Step4(props) {
    return (
        <div>
            {props.listOfTweets}
            <div onClick={props.handlePageLayout('standardTweetsList')}>Standard Layout</div>
            <div onClick={props.handlePageLayout('masonryTweetsList')}>Masonry Layout</div>
        </div>
    )
}

