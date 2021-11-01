import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import './PostViewer.css';

const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const PostViewer = () => {
    return (
        <PostViewerBlock>
            <h1>ddd</h1>
            <div className="PostHead">
                <h1>제목</h1>
                <div className="SubInfo">
                    <span>
                        <b>tester</b>
                    </span>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="Tags">
                    <div className="tag">#태그1</div>
                    <div className="tag">#태그2</div>
                    <div className="tag">#태그3</div>
                </div>
            </div>
            <div className="PostContent" 
                dangerouslySetInnerHTML={{ __html: '<p>HTML <b>내용</b>입니다.</p>' }}/>
        </PostViewerBlock>
    );
};

export default PostViewer;
