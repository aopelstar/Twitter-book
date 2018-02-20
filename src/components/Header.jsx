import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Header extends Component{
    render(){
        return(
            <div>
                <Link to="/home" style={{textDecoration: 'none'}}><div>Home</div></Link> 
                <Link to="/newbook" style={{textDecoration: 'none'}}><div>Add New Book</div></Link> 
                <Link to="/account" style={{textDecoration: 'none'}}><div>Account</div></Link> 
                <Link to="/drafts" style={{textDecoration: 'none'}}><div>Drafts</div></Link> 
            </div>
        )
    }
}