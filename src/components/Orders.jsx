import React from 'react';
import { connect } from 'react-redux';
import { setBook } from '../ducks/reducer';
import small from '../images/8x8book.svg';
import large from '../images/14x11book.svg';
import { Link } from 'react-router-dom';

function Orders(props) {
    let ordersMap = props.orders.map((e, i) => {
        let shortDate = e.orderDate.slice(0, 10)
        let month = shortDate[5] + shortDate[6];
        let day = shortDate[8] + shortDate[9];
        let year = shortDate[0] + shortDate[1] + shortDate[2] + shortDate[3]
        let formatDate = month + '/' + day + '/' + year
        let linesMap = e.orderLines.map((x, y) => {
            let image = x.bookSize === "large" ? large : small
            let bookSize = x.bookSize === "small" ? "8 x 8" : x.bookSize === "medium" ? "10 x 10" : x.bookSize === "large" ? "14 x 11" : "No book size chosen yet."
            return (
                <div className="draftContainer" key={y}>
                    <div className="accountDraft">
                        <div className="draftImgContainer">
                            <img src={image} alt={x.bookTitle} style={{ background: `${x.bookColor}` }} className='draftImg' />
                            <div className="draftSize">{bookSize}</div>
                        </div>
                        <div className="draftNames">
                            <div>{x.bookTitle}</div>
                            <div>Qty: {x.quantity}</div>
                        </div>
                        <div className="draftButtons">
                            <div>${x.bookPrice}</div>
                            <Link to='/newbook'><button onClick={() => props.setBook(x)}>Purchase again!</button></Link>
                        </div>
                    </div>
                    <div className="draftSeparator"></div>
                </div>
            )
        })
        return (
            <div key={i} >
                <div className="accountOrderHead">
                    <div>Order#: {e.orderNumber}</div>
                    <div>Date: {formatDate}</div>
                    <div>Total: ${e.orderTotal}</div>
                </div>
                {linesMap}
            </div>
        )
    })
    return (<div className="accountSideContainer">
        <h1 className="accountHeading">Your Orders:</h1>
        <div className="accountSideBody">
            {ordersMap}
        </div>
    </div>)
}

export default connect(null, { setBook })(Orders)