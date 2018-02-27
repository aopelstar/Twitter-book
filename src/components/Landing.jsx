import React, { Component } from 'react';
import logo from '../images/logo.svg'

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="login">
                    <img src={logo} alt="logo" className="landingLogo" />
                    <h1>Welcome to TwitterBook</h1>
                    <a href={process.env.REACT_APP_LOGIN}><button className="loginButton">Login / Signup</button></a>
                </div>
            </div>
        )
    }
}
export default Landing;