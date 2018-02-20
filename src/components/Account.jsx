import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getUserInfo } from '../ducks/reducer';
import { Link } from 'react-router-dom';


class Account extends Component {
    constructor() {
        super();

        this.state = {
            user: {}
        }
    }

    async componentDidMount() {
        await this.props.getUserInfo()
        const user = this.props.user.data;
        this.setState({
            user: user
        })
    }


    render() {

        let user = this.state.user;
        console.log(user);
        return (
            <div>
                <Header />
                <div className="accountBody">
                    <div className="accountAvatar">
                        <img className="accountImage" src={user.user_image} alt="You" />
                        <div className="accountName">
                            <div>{user.display_name}</div>
                            {/* <div className="accountUserName"></div> */}
                        </div>
                    </div>
                    <div className="accountLinks">
                        <Link to="/account/update"><div>Update Acount Info<div className="line"></div></div></Link>
                        <Link to="/account/order-history"><div>Order History<div className="line"></div></div></Link>
                        <Link to="/account/drafts"><div>Draft Books<div className="line"></div></div></Link>
                    </div>
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