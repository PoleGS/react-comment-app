import React from 'react';
import PropTypes from 'prop-types';
import wrapWithLoadData from './wrapWithLoadData';

class CommentInput extends React.Component{
    static propTypes = {
        onSubmit: PropTypes.func,
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
        this.state = {
            username: props.data,
            content: ''
        }
    }

    handleUsernameChange(event){
        this.setState({
            username: event.target.value
            }
        )
    }

    handleContentChange(event){
        this.setState({
            content: event.target.value
        })
    }
    /*
     * 评论信息需要传递给CommentList，需要将state传递给App,然后在传递给List
     */
    handleSubmit() {
        if(this.props.onSubmit) {
            const {username,content} =this.state;
            this.props.onSubmit({username,content, createdTime: +new Date()})
        }
        this.setState({
            content: '',
        })
    };


    handleUsernameBlur (event) {
        this.props.saveData(event.target.value)
    }

    componentDidMount (){
        this.textarea.focus();
}

    render() {
        return(
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名: </span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            onBlur={this.handleUsernameBlur}
                        />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容: </span>
                    <div className='comment-field-input'>
                        <textarea
                            value={this.state.content}
                            onChange={this.handleContentChange}
                            ref={(textarea) => this.textarea = textarea}
                        />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit}>发布</button>
                </div>
            </div>
        )
    }
}

CommentInput = wrapWithLoadData(CommentInput, 'username');
export default CommentInput;