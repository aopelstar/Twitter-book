import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../images/logo.svg'


class Account extends Component {
    constructor() {
        super();

        this.state = {
            user: {},
            bookCart: [],
        }
    }

    async componentDidMount() {
        await this.props.getUserInfo()
        axios.get("/api/twitter").then(res => {
            this.setState({
                user: res.data.data[0].user
            })
        })

        axios.get("/api/getcart").then(res => {
            console.log(res.data)
            this.setState({
                bookCart: res.data
            })
        })
    }

    multiply(num1, num2){
        return num1 * num2
    }


    render() {

        let user = this.state.user;
        let image = this.state.user.profile_image_url ? this.state.user.profile_image_url.replace('normal', '400x400') : null
        let cart = this.state.bookCart.map((cartLine, i) => {
            return <div className="cartLine" key={i}>
            <div className="accountBookImage"><img src = {logo} alt='logo' className='accountLogo'/></div>
                        <div className="accountBookTitle">{cartLine.book_title}</div>
                        <div className="accountBookPrice">{cartLine.book_price}</div>
                        <div className="accountBookQuantity">{cartLine.quantity}</div>
                        <div className="accountBookTotal">{this.multiply(cartLine.book_price, cartLine.quantity)}</div>

           
           </div>
        })

        return (
            <div>
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
                    <div className="accountCart">
                        {cart}
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