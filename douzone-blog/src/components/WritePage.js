import EditorContainer from "../container/writer/EditorContainer";
import TagBoxContainer from "../container/writer/TagBoxContainer";
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