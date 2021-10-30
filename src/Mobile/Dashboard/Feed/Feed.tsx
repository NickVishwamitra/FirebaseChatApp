import { Avatar, Divider } from "@mantine/core";
import "./Feed.scss";
import Post from "./Post";
const Feed = (props: any) => {
  return (
    <div className="timelineSection" {...props}>
      <p className="feedTitle">Your Feed</p>
      <div className="divider"></div>
      <div className="feed">
        <Post></Post>
        <div className="postDivider"></div>
        <Post></Post>
        <div className="postDivider"></div>
        <Post></Post>
        <div className="postDivider"></div>
        <Post></Post>
        <div className="postDivider"></div>
        <Post></Post>
        <div className="postDivider"></div>
        <Post></Post>
        <div className="postDivider"></div>
        <Post></Post>
        <div className="postDivider"></div>
        <Post></Post>
        <div className="postDivider"></div>
        <Post></Post>
        <div className="postDivider"></div>
      </div>
    </div>
  );
};

export default Feed;
