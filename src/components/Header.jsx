import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Header extends Component{
    render(){
        return(
            <div className="header">
                <Link to="/home" style={{textDecoration: 'none'}} className="link"><div>Home</div></Link> 
                <Link to="/newbook" style={{textDecoration: 'none'}} className="link"><div>Add New Book</div></Link> 
                <Link to="/account" style={{textDecoration: 'none'}} className="link"><div>Account</div></Link> 
                <Link to="/drafts" style={{textDecoration: 'none'}} className="link"><div>Drafts</div></Link> 
            </div>
        )
    }
}