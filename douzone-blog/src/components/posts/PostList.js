 import React from "react";
 import styled from "styled-components";
 import Responsive from "../common/Responsive";
 import Button from "../common/Button";
 import './PostList.css';

 const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
`;
 
const PostItem = () => {
    return (
        <div className="PostItemBlock">
            <h2>제목</h2>
            <div className="SubInfo">
                <span>
                    <b>username</b>
                </span>
                <span>{new Date().toLocaleDateString}</span>
            </div>
            <div className="Tags">
                <div className="tag">#태그1</div>
                <div className="tag">#태그2</div>
            </div>
            <p>포스트 내용의 일부분...</p>
        </div>
    )
}

const PostList = () => {
    return (
        <PostListBlock>
            <div className="WritePostButtonWrapper">
                <Button cyan to="/write">
                    새 글 작성하기
                </Button>
            </div>
            <div>
                <PostItem/>
                <PostItem/>
                <PostItem/>
            </div>
        </PostListBlock>
    );
};

export default PostList;