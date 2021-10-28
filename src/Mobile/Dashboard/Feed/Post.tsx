import { Avatar } from "@mantine/core";

import "./Feed.scss";
const Post = () => {
  return (
    <div className="postContainer">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Avatar
          radius="xl"
          style={{ marginBottom: "5%" }}
          color="green"
        ></Avatar>
        <p
          style={{
            color: "white",
            lineHeight: "1.25",
            fontWeight: 400,
            textAlign: "left",
            margin: "5%",
            inlineSize: "90px",
            overflowWrap: "break-word",
          }}
        >
          Nick Vishwamitra
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: "0",
          marginLeft: "10%",
          minWidth: "50%",
        }}
      >
        <p className="postTitle">Post Title</p>
        <p className="postText">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
        </p>
      </div>
    </div>
  );
};
export default Post;
