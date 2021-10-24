import React from 'react';
import { useCallback,useEffect,useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import './TagBox.css';

const TagListBlock = styled.div`
    display:flex;
    margin-top:0.5rem;
`;

const Tag = styled.div`
    margin-right:0.5rem;
    color:${palette.gray[6]};
    &:hover{
        opacity:0.5;
    }
`;

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({ tag, onRemove }) => (
    <Tag onClick={()=>onRemove(tag)}>#{tag}</Tag>
  ));
  
  // React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
  const TagList = React.memo(({ tags, onRemove }) => (
    <TagListBlock>
      {tags.map(tag => (
        <TagItem key={tag} tag={tag} onRemove={onRemove} />
      ))}
    </TagListBlock>
  ));

const TagBox = ({tags,onChangeTags}) => {
    //input state
    const [input,setInput] = useState('');
    //tage state
    const [localTags, setLocalTags] = useState([]);

    const insertTag = useCallback(
        tag => {
            if(!tag) return; //tag가 공백이면 추가x
            if(localTags.includes(tag)) return; //이미 존재하면 추가x
            const nextTags= [...localTags,tag];
            setLocalTags(nextTags);
        },[localTags, onChangeTags],
    );
    
    const onRemove = useCallback(
        tag=>{
            const nextTags = (localTags.filter(t=> t !== tag));
            setLocalTags(nextTags);
        },[localTags,onChangeTags],
    )

    const onChange =  useCallback(e => {
        setInput(e.target.value);
    },[]);

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            insertTag(input.trim()); //공백제거
            setInput('');
        },[input,insertTag]
    );

    //tags 값이 바뀔 때
    useEffect(()=>{
        setLocalTags(tags);
    },[tags]);


    return (
        <div className="TagBoxBlock">
            <h4>태그</h4>
            <form className="TagForm" onSubmit={onSubmit}>
                <input placeholder="태그를 입력하세요" value={input} onChange={onChange}/>
            <button type="submit">추가</button>
            </form>
            <TagList tags={localTags} onRemove={onRemove}/>
        </div>
    );
};

export default TagBox;