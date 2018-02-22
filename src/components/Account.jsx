import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getUserInfo } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Account extends Component {
    constructor() {
        super();

        this.state = {
            user: {}
        }
    }

    async componentDidMount() {
        await this.props.getUserInfo()
        axios.get("/api/twitter").then(res => {
            this.setState({
                user: res.data.data[0].user
            })
        })
    }


    render() {

        let user = this.state.user;
        let image = this.state.user.profile_image_url?this.state.user.profile_image_url.replace('normal', '400x400'):null
        console.log(user);

        return (
            <div>
                <Header />
                <div className="accountBody">
                    <div className="accountAvatar">
                        <img className="accountImage" src={image} alt="You" />
                        <div className="accountName">
                            <div>@{user.screen_name}</div>
                            <div>{user.name}</div>
                            <div>Followers: {user.followers_count}</div>
                            <div>Friends: {user.friends_count}</div>
                            <div></div>
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