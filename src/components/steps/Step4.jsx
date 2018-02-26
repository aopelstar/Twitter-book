import React from 'react';


export default function Step4(props) {
    return (
        <div>
            {props.listOfTweets}
            <button value="standardTweetsList" onClick={e=>props.handlePageLayout(e.target.value)}>Standard Layout</button>
            <button value="masonryTweetsList" onClick={e=>props.handlePageLayout(e.target.value)}>Masonry Layout</button>
        </div>
    )
}

