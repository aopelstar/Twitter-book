import React from 'react';
import { connect } from 'react-redux';
import { setBook } from '../ducks/reducer';
import {Link} from 'react-router-dom';

function Drafts(props) {
    let draftsMap = props.drafts.map((e, i) => {
        let backText = e.back_text ? e.back_text : "No back text chosen yet."
        let bookColor = e.book_color ? e.book_color : "No book color chosen yet."
        let bookSize = e.book_size ? e.book_size : "No book size chosen yet."
        let bookSubTitle = e.book_subtitle ? e.book_subtitle : "No book subtitle chosen yet."
        let bookTextColor = e.book_text_color ? e.book_text_color : "No book text color chosen yet."
        let bookTitle = e.book_title ? e.book_title : "No book title chosen yet."
        let pagesFormat = e.pages_format ? e.pages_format : "No page format chosen yet."
        return (
            <div key={i}>
                <div>{bookTitle}</div>
                <div>{bookSubTitle}</div>
                <div>{backText}</div>
                <div>{bookColor}</div>
                <div>{bookTextColor}</div>
                <div>{bookSize}</div>
                <div>{pagesFormat}</div>
                <Link to='/newbook' ><button onClick={() => props.setBook(e)}>Modify draft</button></Link>
            </div>
        )
    })
    return (<div>
        {draftsMap}
    </div>)
}


export default connect(null, { setBook })(Drafts)

