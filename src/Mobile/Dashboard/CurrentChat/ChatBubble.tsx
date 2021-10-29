import { Card } from "@mantine/core";
import { color } from "@mui/system";
import { Fragment } from "react";
import "./CurrentChat.scss";

const LeftBubble = () => {
  return (
    <p
      style={{
        padding: "3%",
        border: "2px solid #5C5F66",
        backgroundColor: "#5C5F66",
        borderRadius: "20px",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
        maxWidth: "70%",
        wordWrap: "break-word",
        color: "white",
        paddingLeft: "8%",

        marginTop: 0,
      }}
    >
      Hey bro, how are things?dkfkd fkjdskf dkfk
    </p>
  );
};
const RightBubble = () => {
  return (
    <p
      style={{
        padding: "3%",
        border: "2px solid #00b472",
        backgroundColor: "#00b472",
        borderRadius: "20px",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
        maxWidth: "70%",
        wordWrap: "break-word",
        color: "white",
        paddingLeft: "8%",
        marginTop: 0,
        alignSelf: "flex-end",
      }}
    >
      Hey bro, how are things?
    </p>
  );
};

const ChatBubble = () => {
  return (
    <Fragment>
      <LeftBubble />
      <RightBubble />
      <LeftBubble />
      <RightBubble />
      <LeftBubble />
      <RightBubble />
      <LeftBubble />
      <RightBubble />
      <LeftBubble />
      <RightBubble />
      <LeftBubble />
      <RightBubble />
      <LeftBubble />
      <RightBubble />
    </Fragment>
  );
};
export default ChatBubble;
