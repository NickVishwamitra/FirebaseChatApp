import { getAuth } from "@firebase/auth";
import { getDatabase, onValue, ref } from "@firebase/database";
import { Card, Menu } from "@mantine/core";
import { color } from "@mui/system";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import "./CurrentChat.scss";

const LeftBubble = (props: any) => {
  return (
    <motion.button
      style={{
        padding: "4% 5%",
        border: "2px solid #5C5F66",
        backgroundColor: "#5C5F66",
        borderRadius: "20px",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
        maxWidth: "70%",
        wordWrap: "break-word",
        color: "white",
        alignSelf: "flex-start",
        marginTop: 0,
      }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      {props.text}
    </motion.button>
  );
};
const RightBubble = (props: any) => {
  return (
    <motion.button
      style={{
        padding: "4% 5%",
        border: "2px solid #00b472",
        backgroundColor: "#00b472",
        borderRadius: "20px",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
        maxWidth: "70%",
        wordWrap: "break-word",
        color: "white",
        marginTop: 0,
        alignSelf: "flex-end",
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {props.text}
    </motion.button>
  );
};

const ChatBubble = (props: any) => {
  const openedUserId = props.openedUserId;
  const firebaseDB = getDatabase();
  const auth = getAuth();
  let messages: any[] = [];
  const [bubbles, setBubbles] = useState<any>();
  let data;
  const messagesRef = ref(
    firebaseDB,
    `userdata/${auth.currentUser?.uid}/chatmessages/${openedUserId}`
  );
  useEffect(() => {
    onValue(messagesRef, (snapshot: any) => {
      data = snapshot.val();
      try {
        messages = data.map((chat: any) => chat);
        const tempbubbles = messages.map((chat: any, index: any) => {
          if (chat.userid == auth.currentUser?.uid) {
            return <RightBubble text={chat?.themessage} />;
          } else {
            return <LeftBubble text={chat?.themessage} />;
          }
        });
        setBubbles(tempbubbles);
      } catch (err) {}
    });
  }, []);

  return (
    <motion.div
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      {bubbles}
    </motion.div>
  );
};
export default ChatBubble;
