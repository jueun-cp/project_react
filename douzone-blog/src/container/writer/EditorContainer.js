import React from 'react';
import { useEffect ,useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialize,changeField } from '../../modules/write';
import Editor from '../../components/write/Editor';

const EditorContainer = () => {
    console.log('change dispatch');

    const dispatch = useDispatch();
    const {title,body} = useSelector(({write})=>({
        title:write.title,
        body:write.body,
    }));

    const onChangeField = useCallback(payload=> 
        dispatch(changeField(payload)),[dispatch]);

    //언마운트될때 초기화
    useEffect(()=>{
        return ()=>{
            dispatch(initialize());
        }
    },[dispatch]);
    return <Editor onChangeField={onChangeField} title={title} body={body}/>;
};

export default EditorContainer;