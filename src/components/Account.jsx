import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../images/logo.svg'
import { Drafts, Cart, OrderHistory } from './AccountTabs';


class Account extends Component {
    constructor() {
        super();

        this.state = {
            user: {},
            accountDisplay: 'drafts',
            accountInfo: []
        }
    }

    async componentDidMount() {
        await this.props.getUserInfo()
        let drafts = axios.get('/api/getdrafts')
        let cart = axios.get("/api/getcart")
        let orders = axios.get('/api/orderhistory')

        axios.all([drafts, cart, orders]).then(info => {
            this.setState({
                accountInfo: info
            })
        })
    }

    multiply(num1, num2) {
        return num1 * num2
    }

    handleAccountDisplay(e) {
        this.setState({
            accountDisplay: e
        })
    }


    render() {

        let user = this.state.user;
        let image = this.state.user.profile_image_url ? this.state.user.profile_image_url.replace('normal', '400x400') : null
        
        let accountDisplay;
        if (this.state.accountDisplay == "drafts") {
            accountDisplay = <Drafts />
        }
        else if (this.state.accountDisplay == "cart") {
            accountDisplay = <Cart />
        }
        else if (this.state.accountDisplay == "orders") {
            accountDisplay = <OrderHistory />
        }

        return (
            <div className="accountContainer">
                <div className="accountBody">
                    <div className="accountAvatar">
                        <img className="accountImage" src={image} alt="You" />
                        <div className="accountName">
                            <div className="accountUser">{user.name}</div>
                            <div className="accountScreen">@{user.screen_name}</div>
                            <div className="tweetsFriendsFollowers">
                                <div className="accountStats">Tweets <div>{user.statuses_count}</div></div>
                                <div className="accountStats">Following <div>{user.friends_count}</div></div>
                                <div className="accountStats">Followers <div>{user.followers_count}</div></div>
                            </div>
                        </div>
                    </div>
                    <div className="accountLinks">
                        <div onClick={() => this.handleAccountDisplay("drafts")}>Draft Books</div>
                        <div onClick={() => this.handleAccountDisplay('cart')}>View Cart</div>
                        <div onClick={() => this.handleAccountDisplay('orders')}>Order History</div>
                        <div><a href={process.env.REACT_APP_LOGOUT}>Logout<div className="line"></div></a></div>
                    </div>
                </div>
                <div className="accountSide">
                    <div className="accountCart">
                        {accountDisplay}
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