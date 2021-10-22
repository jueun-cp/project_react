import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String], //문자열로 이루어진 배열
    publishedDate:{
        type: Date,
        default: Date.now,  // 현재 날짜를 기본값으로 지정
    },
});

// 밑의 model 함수는 2개의 파라미터 필요(1: 스키마이름, 2: 스키마 객체)
const Post = mongoose.model('Post', PostSchema);
export default Post;