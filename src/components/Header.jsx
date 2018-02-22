import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer'
import axios from 'axios';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            HamAnimation: true,
            HamClose: false,
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
    hamMenuSlide() {
        this.setState({
            HamAnimation: this.state.HamAnimation ? false : true
        })
    }
    render() {

        let image = this.state.user.profile_image_url?this.state.user.profile_image_url.replace('normal', '400x400'):null

        return (
            <div>
                <div className="header">
                    <Link to="/home"><img src="" alt="logo" /></Link>
                    <Link to="/account"><img src={image} className="headerProfileImg" alt="profile pic" /></Link>
                    <div className="hamMenuContainer">
                        <div className={this.state.HamAnimation ? "hamMenu" : "hamMenu HamSlide"} onClick={() => this.hamMenuSlide()}>
                            <div className="hamLine one"></div>
                            <div className="hamLine two"></div>
                            <div className="hamLine three"></div>
                        </div>
                    </div>
                </div>
                <div className={this.state.HamAnimation ? "menuLinks" : "menuLinks slideLeft" }>
                    <Link to="/home" style={{ textDecoration: 'none' }} className="link H"><div>Home</div></Link>
                    <Link to="/newbook" style={{ textDecoration: 'none' }} className="link"><div>Add New Book</div></Link>
                    <Link to="/account" style={{ textDecoration: 'none' }} className="link"><div>Account</div></Link>
                    <Link to="/drafts" style={{ textDecoration: 'none' }} className="link"><div>Drafts</div></Link>
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
export default connect(mapStateToProps, { getUserInfo })(Header);