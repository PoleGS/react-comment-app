/*
 * 遵循自顶向下，逐步求精的原则，从组件的顶层开始，一步一步往下构建组件树
 */

import React from 'react';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

class CommentApp extends React.Component{
    render(){
        return(
            <div className="wrapper">
                <CommentInput />
                <CommentList />
            </div>
        )
    }
}

export default CommentApp;