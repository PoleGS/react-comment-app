/*
 * 遵循自顶向下，逐步求精的原则，从组件的顶层开始，一步一步往下构建组件树
 */

import React from 'react';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import wrapWithLoadData from './wrapWithLoadData';

class CommentApp extends React.Component{
    static propTypes  = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.state={
            comments: props.data
        }
    }

    //添加数据检查
    handleSubmitComment(comment){
        if(!comment) return;
        if(!comment.username) return alert('输入用户名');
        if(!comment.content) return alert('输入评论');
        const comments = this.state.comments;
        comments.push(comment);
        this.setState({
            comments
        });
        this.props.saveData(comments);
    }

    handleDeleteComment (index) {
        const comments =  this.state.comments;
        comments.splice(index, 1);
        this.setState({ comments });
        this.props.saveData(comments);
    };

    render(){
        return(
            <div className="wrapper">
                <CommentInput  onSubmit={this.handleSubmitComment}/>
                <CommentList
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment}
                />
            </div>
        )
    }
}
CommentApp = wrapWithLoadData(CommentApp, 'comments');
export default CommentApp;