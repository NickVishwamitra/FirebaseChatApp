import "./CurrentChat.css";
import { Card } from "@mantine/core";
import { motion } from "framer-motion";
import { Input } from "@nextui-org/react";
const CurrentChat = () => {
  return (
    <motion.div style={{ backgroundColor: "#252A31" }} className="chatCard">
      <div className="currentChatDiv">
        <div className="messagesArea"></div>
        <div className="inputField">
          <Input
            rounded
            bordered
            color="success"
            placeholder="Message"
            fullWidth
          ></Input>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentChat;
