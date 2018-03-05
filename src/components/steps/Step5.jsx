import React from 'react';
import EightbyEight from '../../images/8x8book.svg'
import FourtbyTen from '../../images/14x11book.svg'

export default function Step5(props) {
    var price = props.book_price
    return (
        <div className="stepOneContainer">
            <div className='stepFiveContainer'>
                <div className='bookOutside'>
                    {props.selectedSize === 'small' ? <div style={{ textAlign: 'center', position: 'relative' }}><img src={EightbyEight} alt="" style={{ backgroundColor: `${props.selectedColor}`, height: '150px' }} /><h1 style={{ color: 'silver', marginTop: '30px' }}>8x8</h1></div> : null}
                    {props.selectedSize === 'medium' ? <div style={{ textAlign: 'center' }}><img src={EightbyEight} alt="" style={{ backgroundColor: `${props.selectedColor}`, height: '170px' }} /><h1 style={{ color: 'silver', marginTop: '30px' }}>10x10</h1></div> : null}
                    {props.selectedSize === 'large' ? <div style={{ textAlign: 'center' }}><img src={FourtbyTen} alt="" style={{ backgroundColor: `${props.selectedColor}`, height: '200px' }} /><h1 style={{ color: 'silver', marginTop: '30px' }}>14x11</h1></div> : null}
                    <div className='outsideBookContext'>
                        <div className='selectedBack' style={{ color: `${props.textColor}` }}>{props.backText}</div>
                        <div className='frontContext' style={{ color: `${props.textColor}` }}>
                            <div className='selectedTitle'>{props.title}</div>
                            <div className='selectedSubtitle'>{props.subtitle}</div>
                        </div>
                    </div>
                </div>
                <div className='checkoutQuantity'>
                    <h1>Price: <strong>{price}</strong></h1>
                    <div className="field" id="quantityfield">
                        <div className='quantityDisplay'>
                            <input id="quantity" placeholder="Qty." min="0" type="number" disabled="disabled" value={props.quantity}></input>
                            <div className="quantityControl">
                                <button onClick={props.increase}>+</button>
                                <button onClick={props.decrease}>-</button>
                            </div>
                        </div>
                    </div>
                    <button className="addToCart" onClick={props.addToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

