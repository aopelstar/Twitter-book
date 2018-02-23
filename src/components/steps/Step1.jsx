import React from 'react';

export default function Step1({size}) {
    return (
        <div>
            <div className="stepOneContainer">
                <div className="bookSizeSmall" onClick={() => size('s')}>
                    <div>8 x 8</div>
                </div>
                <div className="bookSizeMedium" onClick={() => size('m')}>
                    <div>10 x 10</div>
                </div>
                <div className="bookSizeLarge" onClick={() => size('l')}>
                    <div>11 X 14</div>
                </div>
            </div>
        </div>
    )
}
