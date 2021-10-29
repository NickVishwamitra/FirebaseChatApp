import { Avatar, Card, Input, Modal, Text } from "@nextui-org/react";
import ChatBubble from "./ChatBubble";
import "./CurrentChat.scss";
const CurrentChat = (props: any) => {
  const openObject = props.openedObject;

  return (
    <Modal
      closeButton
      blur
      open={openObject.opened}
      onClose={() => openObject.setOpened(false)}
      className="modal"
      style={{ backgroundColor: "rgba(37, 38, 43, 0.7)" }}
      width="90%"
    >
      <Modal.Header>
        <div className="avatarContainer">
          <Avatar
            size="large"
            text="N"
            className="avatarIcon"
            color="#909296"
          />
          <Text className="name">Nick</Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Card
          bordered
          style={{
            background: "none",
            height: "100%",
            borderColor: "rgba(255,255,255,0.1)",
            paddingRight: " 15%",
            overflowY: "scroll",
          }}
          className="messagesContainer"
        >
          <Card.Body>
            <ChatBubble />
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Input
          fullWidth
          color="success"
          placeholder="Enter Message"
          bordered
          style={{ color: "white" }}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default CurrentChat;
