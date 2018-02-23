import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookInfo } from '../../ducks/reducer';


class Step1 extends Component {
    render() {
        return (
            <div>
                <div className="stepOneContainer">
                    <div className="booksizeSmall" onClick={() => this.selectSmall()}>
                        <img src="" alt="" />
                        <div>8 x 8</div>
                    </div>
                    <div className="booksizeMedium" onClick={() => this.selectMedium()}>
                        <img src="" alt="" />
                        <div>10 x 10</div>
                    </div>
                    <div className="booksizeLarge" onClick={() => this.selectLarge()}>
                        <img src="" alt="" />
                        <div>11 X 14</div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        book: state.book
    }
}
export default connect(mapStateToProps, {getBookInfo})(Step1);