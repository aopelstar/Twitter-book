import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer'

class Header extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
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
    render() {
        return (
            <div className="header">
                <img src="" alt="logo" />
                <img src={this.state.user.user_image} className="headerProfileImg" alt="profile pic" />
                <div className="hamMenuContainer">
                    <div className="hamMenu">
                        <div className="hamLine one"></div>
                        <div className="hamLine two"></div>
                        <div className="hamLine three"></div>
                    </div>
                </div>
                <div></div>
                <Link to="/home" style={{ textDecoration: 'none' }} className="link"><div>Home</div></Link>
                <Link to="/newbook" style={{ textDecoration: 'none' }} className="link"><div>Add New Book</div></Link>
                <Link to="/account" style={{ textDecoration: 'none' }} className="link"><div>Account</div></Link>
                <Link to="/drafts" style={{ textDecoration: 'none' }} className="link"><div>Drafts</div></Link>
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