import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer'

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
        const user = this.props.user
        console.log(user.data)
        this.setState({
            user: user.data
        })
    }
    hamMenuSlide() {
        this.setState({
            HamAnimation: this.state.HamAnimation ? false : true
        })
    }
    render() {
        return (
            <div>
                <div className="header">
                    <img src="" alt="logo" />
                    <img src={this.state.user.user_image} className="headerProfileImg" alt="profile pic" />
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