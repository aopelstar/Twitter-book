import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getUserInfo } from '../ducks/reducer';


class Account extends Component {

    componentDidMount() {
        this.props.getUserInfo()
        console.log(this.props.user);
    }


    render() {
        return (
            <div>
                <Header />
                <div className="accountAvatar">
                    <img className="accountImage" src="" alt="You"/>
                    <div>
                        <div className="accountName"></div>
                        <div className="accountUserName"></div>
                    </div>
                </div>
                <div className="accountLinks">
                    <div>Update Acount Info</div>
                    <div>Order History</div>
                    <div>Draft Books</div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }

}
export default connect(mapStateToProps, { getUserInfo })(Account);