import React from 'react';
import { connect } from 'react-redux';
import { setBook } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import small from '../images/8x8book.svg';
import large from '../images/14x11book.svg'

function Drafts(props) {
    let draftsMap = props.drafts.map((e, i) => {
        let backText = e.back_text ? e.back_text : "No back text chosen yet."
        let bookColor = e.book_color ? e.book_color : "No book color chosen yet."
        let bookSize = e.book_size === "small" ? "8 x 8" : e.book_size === "medium" ? "10 x 10" : e.book_size === "large" ? "14 x 11" : "No book size chosen yet."
        let bookSubTitle = e.book_subtitle ? e.book_subtitle : "No book subtitle chosen yet."
        let bookTextColor = e.book_text_color ? e.book_text_color : "No book text color chosen yet."
        let bookTitle = e.book_title ? e.book_title : "No book title chosen yet."
        let pagesFormat = e.pages_format ? e.pages_format : "No page format chosen yet."
        let image = e.book_size === "large" ? large : small
        return (<div className="draftContainer" key={i}>
            <div  className="accountDraft">
                <div className="draftImgContainer">
                    <img src={image} alt={bookTitle} style={{ background: `${bookColor}` }} className="draftImg" />
                    <div className="draftSize">{bookSize}</div>
                </div>
                <div className="draftNames">
                    <div className="draftTitle">{bookTitle}</div>
                    <div className="draftSubTitle">{bookSubTitle}</div>
                </div>
                <div className="draftButtons">
                    <Link to='/newbook' ><button onClick={() => props.setBook(e)}>Modify draft</button></Link>
                    <button onClick={() => props.deleteDraft(e.book_id)}>Delete Draft</button>
                </div>
            </div>
            <div className="draftSeparator" />
        </div>
        )
    })
    return (<div className="accountSideContainer">
        <h1 className="accountHeading">Drafts:</h1>
        <div className="accountSideBody">
            {draftsMap}
        </div>
    </div>)
}


export default connect(null, { setBook })(Drafts)

