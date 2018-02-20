import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer'

class Account extends Component{

    componentDidMount(){
        this.props.getUserInfo()
    }


    render(){
        return(
            <div>
                this is the Account page, succa
            </div>
        )
    }
}
function mapStateToProps( state ){
    return {
        user: state.user
    }

}
export default connect( mapStateToProps, { getUserInfo } ) (Account );