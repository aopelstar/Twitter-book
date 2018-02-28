import React from 'react';
import EightbyEight from '../../images/8x8book.svg'
import FourtbyTen from '../../images/14x11book.svg'

export default function Step1(props) {
    return (
        <div>
            <div className="stepOneContainer">
                <h1 className='sizeTitle'>Choose a book size</h1>
                <div className='booksContainer'>
                    <div className="bookSize" onClick={() => props.size('s')}>
                        <div>8 x 8</div>
                        <img src={EightbyEight} alt="" className={props.selectedSize === 'small' ? 'eightBook selectedBookSize': 'eightBook'}/>
                    </div>
                    <div className="bookSize" onClick={() => props.size('m')}>
                        <div>10 x 10</div>
                        <img src={EightbyEight} alt="" className={props.selectedSize === 'medium' ? 'tenBook selectedBookSize' : 'tenBook'} />
                    </div>
                    <div className="bookSize" onClick={() => props.size('l')}>
                        <div>11 X 14</div>
                        <img src={FourtbyTen} alt="" className={props.selectedSize === 'large' ? 'fourtBook selectedBookSize' : 'fourtBook'} />
                    </div>
                </div>
            </div>
        </div>
    )
}
