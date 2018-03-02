import React, { Component } from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import axios from 'axios'
import { connect } from 'react-redux';
import { getUserInfo} from '../ducks/reducer';
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
            book_text_color: '#000000',
            title: '',
            subtitle: '',
            backText: '',
            pageLayout: 'standardTweetsList',
            featured: false,
            book_price: null,
            draft: true,
            blocked: false,
            quantity: 1,
            listOfTweets: [],
        }
        this.selectBookSize = this.selectBookSize.bind(this)
        this.handleTitleInput = this.handleTitleInput.bind(this)
        this.handleSubtitleInput = this.handleSubtitleInput.bind(this)
        this.handleBackInput = this.handleBackInput.bind(this)
        this.handlePageLayout = this.handlePageLayout.bind(this)
        this.increaseQuantity = this.increaseQuantity.bind(this)
        this.decreaseQuantity = this.decreaseQuantity.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.handlePageLayout = this.handlePageLayout.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addTweetToBook = this.addTweetToBook.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
    }
    async componentDidMount() {
        await this.props.getUserInfo()
        const { user, setBook } = this.props
        this.setState({
            user: user,
        })
        if(setBook.book_id){
            this.setState({
                backText: setBook.back_text,
                book_color: setBook.book_color,
                book_id: setBook.book_id,
                book_price: setBook.book_price,
                size: setBook.book_size,
                subtitle: setBook.book_subtitle,
                book_text_color: setBook.book_text_color,
                title: setBook.book_title,
                draft: setBook.draft,
                featured: setBook.featured,
                pageLayout: setBook.pages_format,
            })
        }

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
            subtitle: this.state.subtitle,
            backText: this.state.backText,
            book_text_color: this.state.book_text_color,
            pages_format: this.state.pageLayout,
            featured: this.state.featured,
            book_price: this.state.book_price,
            draft: this.state.draft,
            booktweets: this.state.listOfTweets
        }
        if (this.state.position > 1) {
            axios.post('/api/create-book', book).then(res => {
                this.setState({
                    book_id: res.data[0].book_id,
                    size: res.data[0].book_size,
                    color: res.data[0].book_color,  
                    book_text_color: res.data[0].book_text_color,
                    title: res.data[0].book_title,
                    subtitle: res.data[0].book_subtitle,
                    backText: res.data[0].back_text,
                    pageLayout: res.data[0].pages_format,
                    featured: res.data[0].featured,
                    book_price: res.data[0].book_price,
                    draft: res.data[0].draft,
                    booktweets: res.data[0].booktweets
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
                size: 'small',
                book_price: 19.99
            })
        }
        if (p === 'm') {
            this.setState({
                size: 'medium',
                book_price: 29.99
            })
        }
        if (p === 'l') {
            this.setState({
                size: 'large',
                book_price: 39.99
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
    addToCart(props) {
        this.setState({
            draft: false
        })
        axios.post('/api/addtocart', {
            book_id: this.state.book_id,
            quantity: this.state.quantity,
            book_price: this.state.book_price,
            user_id: this.props.user.data.auth_id
        }).then(res => {
            return res
        })
    }
    increaseQuantity() {
        var increment = this.state.quantity + 1
        this.setState({
            quantity: increment
        })
    }
    decreaseQuantity() {
        var decrement = this.state.quantity - 1
        this.setState({
            quantity: decrement
        })
    }
    handleChange(color, event) {
        this.setState({
            book_color: color.hex
        })
    }
    handleTextChange(color, event) {
        this.setState({
            book_text_color: color.hex
        })
    }
    addTweetToBook(e) {
        this.setState({
            listOfTweets: [...this.state.listOfTweets, e]
        })
    }
    render() {
        return (
            <div className='stepsContainer'>
                <div className="stepIdicator">Step {this.state.position}</div>
                {this.state.position === 1 ? <Step1 size={this.selectBookSize} selectedSize={this.state.size} /> : null}
                {this.state.position === 2 ? <Step2
                    handleChange={this.handleChange}
                    selectedColor={this.state.book_color}
                    selectedSize={this.state.size}
                /> : null}
                {this.state.position === 3 ? <Step3
                    handleBackInput={this.handleBackInput}
                    handleSubtitleInput={this.handleSubtitleInput}
                    handleTitleInput={this.handleTitleInput}
                    selectedColor={this.state.book_color}
                    selectedSize={this.state.size}
                    title={this.state.title}
                    backText={this.state.backText}
                    subtitle={this.state.subtitle}
                    textColor={this.state.book_text_color}
                    handleTextChange={this.handleTextChange}
                /> : null}
                {this.state.position === 4 ? <Step4
                    handlePageLayout={this.handlePageLayout}
                    addTweetToBook={this.addTweetToBook}
                /> : null}
                {this.state.position === 5 ? <Step5
                    quantity={this.state.quantity}
                    increase={this.increaseQuantity}
                    decrease={this.decreaseQuantity}
                    addToCart={this.addToCart}
                    book_price={this.state.book_price}
                /> : null}
                {this.state.position === 6 ? <Step6 /> : null}
                <div className="stepNavigation">
                    {this.state.position === 1 ? <div className="navButton none"></div> : <button onClick={() => this.prev()} className="navButton">Prev</button>}
                    {this.state.position === 6 ? <div className="navButton none"></div> : <button onClick={() => this.next()} className='navButton'>Next</button>}
                </div>
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                        `When leaving this page your current book will be saved to drafts`
                    }
                />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        setBook: state.setBook
    }
}
export default connect(mapStateToProps, { getUserInfo })(NewBook);