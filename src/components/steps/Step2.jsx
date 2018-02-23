import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookInfo } from '../../ducks/reducer';

class Step2 extends Component {
    render() {
        return (
            <div>
                step2
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        book: state.book
    }
}
export default connect(mapStateToProps, {getBookInfo})(Step2);