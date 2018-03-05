import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import axios from 'axios';
import Drafts from './Drafts';
import Cart from './Cart';
import Orders from './Orders';
import './Account.css';


class Account extends Component {
    constructor() {
        super();

        this.state = {
            user: {},
            accountDisplay: 'drafts',
            cart: [],
            drafts: [],
            orders: []
        }
        this.deleteDraft = this.deleteDraft.bind(this);
    }

    async componentDidMount() {
        await this.props.getUserInfo()
        let user = axios.get("/api/twitter")
        let drafts = axios.get('/api/getdrafts')
        let cart = axios.get("/api/getcart")
        let orders = axios.get('/api/orderhistory')

        axios.all([user, drafts, cart, orders]).then(info => {
            this.setState({
                user: info[0].data.data[0].user,
                drafts: info[1].data,
                cart: info[2].data,
                orders: info[3].data
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

    deleteDraft(id) {
        axios.delete('/api/deletedraft/' + id).then(newdrafts => {
            this.setState({
                drafts: newdrafts.data
            })
        })
    }


    render() {
        let user = this.state.user;
        let image = user.profile_image_url ? user.profile_image_url.replace('normal', '400x400') : null

        let accountDisplay;
        if (this.state.accountDisplay === "drafts") {
            accountDisplay = <Drafts drafts={this.state.drafts} deleteDraft={this.deleteDraft} />
        }
        else if (this.state.accountDisplay === "cart") {
            accountDisplay = <Cart cart={this.state.cart} />
        }
        else if (this.state.accountDisplay === "orders") {
            accountDisplay = <Orders orders={this.state.orders} />
        }

        return (
            <div className="accountContainer">
                <div className="accountBody">
                    <div className="accountAvatar">
                        <img className="accountImage" src={image} alt="You" />
                        <div className="accountUserDetails">
                        <div></div>
                        <div className="accountName">
                            <div>
                                <div className="accountUser">{user.name}</div>
                                <div className="accountScreen">@{user.screen_name}</div>
                            </div>
                            <div className="tweetsFriendsFollowers">
                                <div className="accountStats">Tweets <div>{user.statuses_count}</div></div>
                                <div className="accountStats">Following <div>{user.friends_count}</div></div>
                                <div className="accountStats">Followers <div>{user.followers_count}</div></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="accountLinks">
                        <div onClick={() => this.handleAccountDisplay("drafts")}>Draft Books</div>
                        <div onClick={() => this.handleAccountDisplay('cart')}>View Cart</div>
                        <div onClick={() => this.handleAccountDisplay('orders')}>Order History</div>
                        <div><a href={process.env.REACT_APP_LOGOUT}>Logout</a></div>
                    </div>
                </div>
                <div className="accountBody">
                    {accountDisplay}
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