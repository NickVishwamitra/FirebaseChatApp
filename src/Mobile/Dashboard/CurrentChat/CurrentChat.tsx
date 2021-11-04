import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Input, Modal, Text } from "@nextui-org/react";
import ChatBubble from "./ChatBubble";
import { PaperPlaneIcon } from "@modulz/radix-icons";
import "./CurrentChat.scss";
import { useRef, useState } from "react";
import { getDatabase, push, ref, set } from "@firebase/database";
import { get } from "firebase/database";
import { getAuth } from "@firebase/auth";
import { useForceUpdate } from "@mantine/hooks";
import { Avatar } from "@mantine/core";
const CurrentChat = (props: any) => {
  const openObject = props.openedObject;
  const [enteredMessage, setEnteredMessage] = useState("");
  const forceupdate = useForceUpdate();
  const inputRef = useRef<any>();
  const inputHandler = (e: any) => {
    setEnteredMessage(e.target.value);
  };
  const auth = getAuth();
  const submitMessage = (e: any) => {
    if (e.key == "Enter" || e.type == "click") {
      const date = Date.now();
      if (inputRef.current?.value) {
        writeMessage(auth.currentUser?.uid, date, inputRef.current?.value);
      }
      inputRef.current.value = "";
    }
    forceupdate();
  };

  const writeMessage = (userid: any, timestamp: any, message: string) => {
    const db = getDatabase();
    get(ref(db, `userdata/${userid}/chatmessages/${props.openedUserId}`)).then(
      (snapshot: any) => {
        if (snapshot.exists()) {
          const index = snapshot.val().length;
          const currentChatRef = ref(
            db,
            `userdata/${userid}/chatmessages/${props.openedUserId}/${index}`
          );
          set(currentChatRef, {
            userid: userid,
            themessage: message,
            timestamp: timestamp,
          });
          const otherChatRef = ref(
            db,
            `userdata/${props.openedUserId}/chatmessages/${auth.currentUser?.uid}/${index}`
          );
          set(otherChatRef, {
            userid: userid,
            themessage: message,
            timestamp: timestamp,
          });
        } else {
          const currentChatRef = ref(
            db,
            `userdata/${userid}/chatmessages/${props.openedUserId}/0`
          );
          set(currentChatRef, {
            userid: userid,
            themessage: message,
            timestamp: timestamp,
          });
        }
      }
    );
    get(ref(db, `userdata/${auth.currentUser?.uid}`)).then((snapshot) => {
      const data = snapshot.val();
      const currentPfp = data.profilepic;
      const currentName = data.name;
      const currentuid = data.userid;

      const otherAllChatsRef = ref(
        db,
        `userdata/${props.openedUserId}/chats/${auth.currentUser?.uid}/`
      );

      // set(otherAllChatsRef, {
      //   otheruserid: currentuid,
      //   otherprofilepic: currentPfp,
      //   chatname: currentName,
      // });
    });
  };

  type ContentPosition = "right";

  return (
    <Modal
      closeButton
      blur
      open={openObject.opened}
      onClose={() => openObject.setOpened(false)}
      className="modal"
      style={{
        backgroundColor: "rgba(37, 38, 43, 0.95)",
      }}
      width="90%"
    >
      <Modal.Header>
        <div className="avatarContainer">
          <Avatar
            size="md"
            radius="xl"
            src={props.openedPfp}
            className="avatarIcon"
            color="#909296"
          />
          <Text className="name">{props.chatName}</Text>
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
            <ChatBubble openedUserId={props.openedUserId} />
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
          onChange={inputHandler}
          onKeyDown={submitMessage}
          contentClickable
          contentRight={<PaperPlaneIcon color="white" />}
          onContentClick={(key, e) => submitMessage(e)}
          ref={inputRef}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default CurrentChat;
