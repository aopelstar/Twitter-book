import React from 'react';


export default function Step3(props) {
    return (
        <div>
            <input type="text" placeholder="Title" onChange={e=>props.handleTitleInput(e.target.value)}></input>
            <input type="text" placeholder="Subtitle" onChange={e=>props.handleSubtitleInput(e.target.value)}></input>
            <input type="text" placeholder="Back" onChange={e=>props.handleBackInput(e.target.value)}></input>
        </div>
    )
}

