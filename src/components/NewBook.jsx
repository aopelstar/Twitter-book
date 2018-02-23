import React, { Component } from 'react';


export default class NewBook extends Component{
    constructor(){
        super();
        this.state = {
            position: 1
        }
    }
    render(){
        return(
            <div>
                {this.state.position === 1 ? null : null}
                {this.state.position === 2 ? null : null}
                {this.state.position === 3 ? null : null}
                {this.state.position === 4 ? null : null}
                {this.state.position === 5 ? null : null}
            </div>
        )
    }
}