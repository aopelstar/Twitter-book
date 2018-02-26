import React, { Component } from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import axios from 'axios'
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';


class NewBook extends Component {
    constructor() {
        super();
        this.state = {
            position: 1,
            book_id: 0,
            size: '',
            color: null,
            title: '',
            subtitle: '',
            backText: '',
            listOfTweets: {},
            pageLayout: 'standardTweetsList'
        }
        this.selectBookSize = this.selectBookSize.bind(this)
        this.handleTitleInput = this.handleTitleInput.bind(this)
        this.handleSubtitleInput = this.handleSubtitleInput.bind(this)
        this.handleBackInput = this.handleBackInput.bind(this)
    }
    async next() {
        await this.setState({
            position: this.state.position + 1
        })
        var book = {
            size: this.state.size,
            title: this.state.title,
            subtitle: this.state.title,
            backText: this.state.backText
        }
        if(this.state.position > 2){
            axios.post('/api/create-book', book).then(res => {
                console.log('res')
            })
        }else{
            null
        }
    }
    prev() {
        this.setState({
            position: this.state.position - 1
        })
    }
    selectBookSize(p) {
        if (p === 's') {
            this.setState({
                size: 'small'
            })
        }
        if (p === 'm') {
            this.setState({
                size: 'medium'
            })
        }
        if (p === 'l') {
            this.setState({
                size: 'large'
            })
        }
    }
    handleTitleInput(val) {
        this.setState({
            title: val
        })
    }
    handleSubtitleInput(val) {
        this.setState({
            subtitle: val
        })
    }
    handleBackInput(val) {
        this.setState({
            backText: val
        })
    }
    handelPageLayout(p){
        this.setState({
            pageLayout: p
        })
    }
    render() {
        return (
            <div>
                {this.state.position === 1 ? <Step1 size={this.selectBookSize} /> : null}
                {this.state.position === 2 ? <Step2 /> : null}
                {this.state.position === 3 ? <Step3
                    handleBackInput={this.handleBackInput}
                    handleSubtitleInput={this.handleSubtitleInput}
                    handleTitleInput={this.handleTitleInput}
                /> : null}
                {this.state.position === 4 ? <Step4 handelPageLayout={this.handelPageLayout} listOfTweets={this.state.listOfTweets}/> : null}
                {this.state.position === 5 ? <Step5 /> : null}
                <button onClick={() => this.prev()}>Prev</button>
                <button onClick={() => this.next()}>Next</button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUserInfo })(NewBook);