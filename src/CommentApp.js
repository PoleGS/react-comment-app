/*
 * 遵循自顶向下，逐步求精的原则，从组件的顶层开始，一步一步往下构建组件树
 */

import React from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends React.Component{
    constructor() {
        super();
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.state={
            comments: []
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
        this._saveComments(comments);
    }

    componentWillMount() {
        this._loadComments();
    }
    _saveComments(comments) {
        localStorage.setItem('comments',JSON.stringify(comments));
    };

    _loadComments(){
        let comments = localStorage.getItem('comments');
        if (comments) {
            comments = JSON.parse(comments);
            this.setState({comments});
        }
    };

    handleDeleteComment (index) {debugger
        const comments =  this.state.comments;
        comments.splice(index, 1);
        this.setState({ comments });
        this._saveComments(comments);
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

export default CommentApp;