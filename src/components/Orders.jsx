import React from 'react';
import { connect } from 'react-redux';
import { setBook } from '../ducks/reducer';

function Orders(props) {
    let ordersMap = props.orders.map((e, i) => {
        console.log(e);
        let linesMap = e.orderLines.map((x, y) => {
            return (
                <div key={y}>
                    <div>{x.bookTitle}</div>
                    <div>{x.bookSubTitle}</div>
                    <div>{x.backText}</div>
                    <div>{x.bookColor}</div>
                    <div>{x.bookTextColor}</div>
                    <div>{x.bookSize}</div>
                    <div>{x.bookPrice}</div>
                    <div>{x.quantity}</div>
                    <button onClick={() => props.setBook(x)}>Purchase again!</button>
                </div>
            )
        })
        return (
            <div key={i}>
                <div>{e.orderNumber}</div>
                <div>{e.orderDate}</div>
                <div>{e.orderTotal}</div>
                {linesMap}
            </div>
        )
    })
    return (<div>
        {ordersMap}
    </div>)
}

export default connect(null, { setBook })(Orders)