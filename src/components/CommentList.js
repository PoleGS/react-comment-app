import React from 'react';
import Comment from "./Comment";
import PropTypes from 'prop-types';

class CommentList extends React.Component{
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }
    static defaultProps ={
        comments : []
    }

    constructor() {
        super();
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    handleDeleteComment (index){
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        }
    }
    render() {
        return(
            <div>
                {
                    this.props.comments.map((comment,i)=>
                        <Comment
                            comment={comment}
                            key={i}
                            index={i}
                            onDeleteComment={this.handleDeleteComment}
                        />
                    )
                }
            </div>
        )
    }
}

export default CommentList;