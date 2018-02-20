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
                        <div><Link to="/account/update">Timeline<div className="line"></div></Link></div>
                        <div><Link to="/account/update">Update Acount Info<div className="line"></div></Link></div>
                        <div><Link to="/account/order-history">Order History<div className="line"></div></Link></div>
                        <div><Link to="/account/drafts">Draft Books<div className="line"></div></Link></div>
                        <div><a href={process.env.REACT_APP_LOGOUT}>Logout<div className="line"></div></a></div>
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