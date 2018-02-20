import React, { Component } from 'react';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="login">
                    <img src="" alt="logo" className="landingLogo" />
<<<<<<< HEAD
                    <h1>Please Login or Signup</h1>
                    <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
=======
                    <h1>Welcome to TwitterBook</h1>
                    <a href={process.env.REACT_APP_LOGIN}><button>Login / Signup</button></a>
>>>>>>> master
                </div>
            </div>
        )
    }
}
export default Landing;