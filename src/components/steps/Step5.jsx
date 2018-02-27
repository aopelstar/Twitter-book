import React from 'react';


export default function Step5(props) {
    var price = props.book_price
    return (
        <div>
            <h1>Price: {price}</h1>
            <div className="field" id="quantityfield">
                <input id="quantity" placeholder="Qty." min={0} type="number" disabled="disabled" value={props.quantity}></input>
                <div className="quantityControl">
                    <button onClick={props.increase}>+</button>
                    <button onClick={props.decrease}>-</button>
                </div>
                <button className="addToCart" onClick={props.addToCart}>Add to cart</button>
            </div>
        </div>
    )
}

