import React from 'react';


export default function Step3(props) {
    return (
        <div>
            <input type="text" placeholder="Title" value={} onChange={e=>props.handleTitleInput(e.target.value)}></input>
            <input type="text" placeholder="Subtitle" value={} onChange={e=>props.handleSubtitleInput(e.target.value)}></input>
            <input type="text" placeholder="Back" value={} onChange={e=>props.handleBackInput(e.target.value)}></input>
        </div>
    )
}

