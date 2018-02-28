import React from 'react';
import { SwatchesPicker } from 'react-color';
import EightbyEight from '../../images/8x8book.svg'
import FourtbyTen from '../../images/14x11book.svg'

export default function Step2(props) {
    return (
        <div className="stepOneContainer">
            <h1>Choose book color</h1>
            <div className='stepTwoColor'>
            { props.selectedSize === 'small' ? <div style={{textAlign: 'center'}}><h1>8x8</h1><img src={EightbyEight} alt="" style={{backgroundColor: `${props.selectedColor}`, height: '100px'}}/></div> : null }
            { props.selectedSize === 'medium' ? <div style={{textAlign: 'center'}}><h1>10x10</h1><img src={EightbyEight} alt="" style={{backgroundColor: `${props.selectedColor}`, height: '120px'}}/></div> : null }
            { props.selectedSize === 'large' ? <div style={{textAlign: 'center'}}><h1>14x11</h1><img src={FourtbyTen} alt="" style={{backgroundColor: `${props.selectedColor}`, height: '130px'}}/></div> : null }
            <SwatchesPicker onChange={(color,event) => props.handleChange(color, event)} />
            </div>
        </div>
    )
}
