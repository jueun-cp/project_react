import EditorContainer from "../container/write/EditorContainer";
import TagBoxContainer from "../container/write/TagBoxContainer";
import Responsive from "./common/Responsive";
import WriteActionButtons from "./write/WriteActionButtons";

const WritePage = () => {
    return ( 
    <Responsive> 
        <h1>글쓰기</h1> 
        <EditorContainer/>
        <TagBoxContainer/>
        <WriteActionButtons/>
    </Responsive>
    )
};

export default WritePage;