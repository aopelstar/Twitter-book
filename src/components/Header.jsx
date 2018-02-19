import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Header extends Component{
    render(){
        return(
            <div>
                <Link to="/home"><div>Home</div></Link> 
                <Link to="/newbook"><div>Add New Book</div></Link> 
                <Link to="/account"><div>Account</div></Link> 
                <Link to="/drafts"><div>Drafts</div></Link> 
            </div>
        )
    }
}