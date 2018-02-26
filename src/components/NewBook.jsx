import React, { Component } from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import ColorPicker from './ColorPicker';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import axios from 'axios'
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import { Prompt } from 'react-router-dom';


class NewBook extends Component {
    constructor() {
        super();
        this.state = {
            position: 1,
            book_id: 0,
            user: {},
            size: '',
            book_color: '',
            title: '',
            subtitle: '',
            backText: '',
            listOfTweets: [],
            pageLayout: 'standardTweetsList',
            featured: null,
            book_price: null,
            draft: null,
            blocked: false
        }
        this.selectBookSize = this.selectBookSize.bind(this)
        this.handleTitleInput = this.handleTitleInput.bind(this)
        this.handleSubtitleInput = this.handleSubtitleInput.bind(this)
        this.handleBackInput = this.handleBackInput.bind(this)
        this.handlePageLayout = this.handlePageLayout.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    async componentDidMount() {
        await this.props.getUserInfo()
        const { user } = this.props
        this.setState({
            user: user
        })
    }
    async next() {
        await this.setState({
            position: this.state.position + 1,
            blocked: true
        })
        var book = {
            user_id: this.state.user.auth_id,
            book_id: this.state.book_id,
            color: this.state.book_color,
            size: this.state.size,
            title: this.state.title,
            subtitle: this.state.title,
            backText: this.state.backText,
            pages_format: this.state.pageLayout,
            featured: this.state.featured,
            book_price: this.state.book_price,
            draft: this.state.draft
        }
        if (this.state.position > 1) {
            axios.post('/api/create-book', book).then(res => {
                console.log(res.data)
                this.setState({
                    book_id: res.data[0].book_id,
                    size: res.data[0].book_size,
                    color: res.data[0].book_color,
                    title: res.data[0].book_title,
                    subtitle: res.data[0].book_subtitle,
                    backText: res.data[0].back_text,
                    pageLayout: res.data[0].pages_format,
                    featured: res.data[0].featured,
                    book_price: res.data[0].book_price,
                    draft: res.data[0].draft
                })
            })
        } else {
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
    handlePageLayout(p) {
        this.setState({
            pageLayout: p
        })
    }
    handleChange(color, event) {
        this.setState({
            book_color: color.hex
        })
    }
    render() {
        return (
            <div>
                {this.state.position === 1 ? <Step1 size={this.selectBookSize} /> : null}
                {this.state.position === 2 ? <Step2 handleChange={this.handleChange} /> : null}
                {this.state.position === 3 ? <Step3
                    handleBackInput={this.handleBackInput}
                    handleSubtitleInput={this.handleSubtitleInput}
                    handleTitleInput={this.handleTitleInput}
                /> : null}
                {this.state.position === 4 ? <Step4 handlePageLayout={this.handlePageLayout} listOfTweets={this.state.listOfTweets} /> : null}
                {this.state.position === 5 ? <Step5 /> : null}
                <button onClick={() => this.prev()}>Prev</button>
                <button onClick={() => this.next()}>Next</button>
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                        `Select save changes before leaving this page.`
                    }
                />
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