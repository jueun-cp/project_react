import Quill from 'quill';
import React from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import './Editor.css';
import '../../lib/styles/quill.bubble.css'

const EditorBlock = styled(Responsive)`
    /* 페이지 위아래 여백 지정*/
    padding-top: 5rem;
    padding-bottom: 5rem;
`;

const Editor = ({title,body,onChangeField}) => {
    const quillElement = useRef(null);  // Quill을 적용할 DivElment 설정
    const quillInstance = useRef(null); // Quill 인스턴스 설정
    
    useEffect(()=>{
        quillInstance.current = new Quill(quillElement.current,{
            theme: 'bubble',
            placeholder: '내용을 작성하세요 ..',
            modules: {
                toolbar : [
                    [{header : '1'}, {header : '2'}],
                    ['bold','italic','underline','strike'],
                    [{list: 'ordered'},{list:'bullet'}],
                    ['blockquote','code-block','link','image']
                ],
            },
        });
        //quill에 text-change 핸들러 등록
        const quill = quillInstance.current;
        quill.on('text-change',(delta, oldDelta,source)=>{
            if (source === 'user'){
                onChangeField({key:'body',value:quill.root.innerHTML});
            }
        });
    },[onChangeField]);

    const onChangeTitle = e =>{
        onChangeField({key:'title',value:e.target.value});
    };
    
    return (
        <EditorBlock>
            <input className="TittleInput" placeholder="제목을 입력하세요"
            onChange={onChangeTitle} value={title} />
            <div className="QuilWrapper">
                <div ref={quillElement} />
            </div>
        </EditorBlock>
    );
};

export default Editor;