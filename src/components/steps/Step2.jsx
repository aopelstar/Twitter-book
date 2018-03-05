import React from 'react';
import { SwatchesPicker } from 'react-color';
import EightbyEight from '../../images/8x8book.svg'
import FourtbyTen from '../../images/14x11book.svg'

export default function Step2(props) {
    return (
        <div className="stepOneContainer">
            <h1>Choose a color for the cover</h1>
            <div className='stepTwoColor'>
                {props.selectedSize === 'small' ? <div style={{ textAlign: 'center', position: 'relative' }}><img src={EightbyEight} alt="" style={{ backgroundColor: `${props.selectedColor}`, height: '150px' }} /><h1 style={{ color: 'silver', marginTop: '30px' }}>8x8</h1></div> : null}
                {props.selectedSize === 'medium' ? <div style={{ textAlign: 'center' }}><img src={EightbyEight} alt="" style={{ backgroundColor: `${props.selectedColor}`, height: '170px' }} /><h1 style={{ color: 'silver', marginTop: '30px' }}>10x10</h1></div> : null}
                {props.selectedSize === 'large' ? <div style={{ textAlign: 'center' }}><img src={FourtbyTen} alt="" style={{ backgroundColor: `${props.selectedColor}`, height: '200px' }} /><h1 style={{ color: 'silver', marginTop: '30px' }}>14x11</h1></div> : null}
                <SwatchesPicker onChange={(color, event) => props.handleChange(color, event)} />
            </div>
        </div>
    )
}
