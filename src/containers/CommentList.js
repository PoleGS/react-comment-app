import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CommentList from '../components/CommentList';
import {initComments, deleteComment} from "../reducers/comments";

/*
    CommentList Container
    一个Smart组件,负责评论列表数据的加载,初始化,删除评论.
    沟通CommentList和state
 */

class CommentListContainer extends Component{
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        onDeleteComment: PropTypes.func
    }

    componentWillMount() {
        //初始化评论
        this._loadComments();
    }

    _loadComments () {
        //从LocalStorage中加载评论
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : [];
        this.props.initComments(comments);
    }

    handleDeleteComment (index) {
        const {comments} = this.props;
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ];
        //保存最新评论到LocalStorage
        localStorage.setItem('comments', JSON.stringify(newComments));
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        }
    }

    render() {
        return(
            <CommentList
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}
            />
        )
    }

}

//Comments从state.comments中获取
const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //提供给CommentListContainer
        //当从LocalStorage加载评论列表,就会通过这个方法,
        //把评论列表初始化到state中
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}

// 将 CommentListContainer connect 到 store
// 会把 comments、initComments、onDeleteComment 传给 CommentListContainer
CommentList = connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);
export default CommentList
