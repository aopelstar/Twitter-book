import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookInfo } from '../../ducks/reducer';


class Step4 extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(state){
    return ({
        book: state.book
    })
}
export default connect(mapStateToProps , {getBookInfo})(Step4)