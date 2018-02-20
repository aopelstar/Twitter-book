import React, { Component } from 'react';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="login">
                    <img src="" alt="logo" className="landingLogo" />
                    <h1>Welcome to Twitter Book</h1>
                    <a href="/auth"><button>Login / Signup</button></a>
                </div>
            </div>
        )
    }
}
export default Landing;