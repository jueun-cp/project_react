import React from 'react';
import Button from '../common/Button.js';
import './WriteActionButtons.css';

const WriteActionButtons = ({onCancel, onPublish}) => {
    return (
        <div className="WriteActionButtonsBlock ">
            <Button className ="StyledButton" cyan onClick={onPublish}> 포스트 등록 </Button>
            <Button className ="StyledButton margin-left" onClick={onCancel}> 취소 </Button>
        </div>
        
    );
};

export default WriteActionButtons;

