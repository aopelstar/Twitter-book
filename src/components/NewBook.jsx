import React, { Component } from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';


export default class NewBook extends Component{
    constructor(){
        super();
        this.state = {
            position: 1
        }
    }
    next(){
        this.setState({
            position: this.state.position + 1
        })
    }
    prev(){
        this.setState({
            position: this.state.position - 1
        })
    }
    render(){
        return(
            <div>
                {this.state.position === 1 ? <Step1/> : null}
                {this.state.position === 2 ? <Step2/> : null}
                {this.state.position === 3 ? <Step3/> : null}
                {this.state.position === 4 ? <Step4/> : null}
                {this.state.position === 5 ? <Step5/> : null}
                <button onClick={() => this.prev()}>Prev</button>
                <button onClick={() => this.next()}>Next</button>
            </div>
        )
    }
}