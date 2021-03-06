import "./Dashboard.scss";
import { PlusIcon } from "@modulz/radix-icons";
import {
  Avatar,
  Card,
  LoadingOverlay,
  Popover,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { forwardRef, Fragment, Ref, useEffect, useState } from "react";
import { motion } from "framer-motion";
import CurrentChat from "./CurrentChat/CurrentChat";
import { Loading } from "@nextui-org/react";
import LoadingScreen from "../LoadingScreen";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { firebaseConfig } from "../../firebase";
import { getAuth } from "@firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getDatabase();
const auth = getAuth();

const AddPersonAvatar = forwardRef((props: any, ref: any) => (
  <Avatar
    ref={ref}
    radius="xl"
    size="lg"
    styles={{
      placeholder: {
        backgroundColor: "rgba(37, 42, 49, 0.6)",
      },
    }}
    style={{ marginTop: "5%" }}
  >
    <PlusIcon style={{ transform: "scale(1.5)", color: "#00b472" }} />
  </Avatar>
));

const MotionAddAvatar = motion(AddPersonAvatar);

const EmptyAvatar = forwardRef((props: any, ref: any) => (
  <div style={{ display: "flex", flexDirection: "column", marginTop: "5%" }}>
    <Avatar
      {...props}
      ref={ref}
      radius="xl"
      size="lg"
      styles={{
        placeholder: {
          backgroundColor: "rgba(37, 42, 49, 0.15)",
        },
      }}
    >
      <p></p>
    </Avatar>
  </div>
));
const MotionAvatar = motion(EmptyAvatar);

const UserAvatar = forwardRef((props: any, ref: any) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Avatar
      {...props}
      ref={ref}
      radius="xl"
      size="lg"
      styles={{
        placeholder: {
          backgroundColor: "rgba(37, 42, 49, 0.15)",
        },
      }}
    ></Avatar>
  </div>
));
const MotionUserAvatar = motion(UserAvatar);

const AllAvatars = (props: any) => {
  const [opened, setOpened] = useState(false);
  const [openedUserId, setOpenedUserID] = useState("");
  const [openedName, setOpenedName] = useState("");
  const [openedPfp, setOpenedPfp] = useState("");
  const userchatdataref = ref(firebaseDB, `userdata/${auth.currentUser?.uid}`);
  let profilepics: any;
  let userids: any;
  let names: any;
  let data: any;

  try {
    onValue(userchatdataref, (snapshot: any) => {
      data = snapshot.val();
      profilepics = data.chats?.map((chat: any) => {
        return chat.otherprofilepic;
      });
      userids = data.chats?.map((chat: any) => {
        return chat.otheruserid;
      });
      names = data.chats?.map((chat: any) => {
        return chat.chatname;
      });
    });
    const avatars = profilepics.map((pic: any, index: any) => {
      const tapHandler = () => {
        setOpened(true);
        setOpenedUserID(userids[index]);
        setOpenedName(names[index]);
        setOpenedPfp(profilepics[index]);
      };

      return (
        <div>
          <p
            style={{
              margin: "0",
              marginTop: "0%",
              marginBottom: "5%",
              color: "white",
              fontSize: "0.75rem",
            }}
          >
            {names[index]}
          </p>
          <MotionUserAvatar
            src={pic}
            onTap={tapHandler}
            {...props}
            // style={{ border: "3px solid #00b472" }}
          ></MotionUserAvatar>
          <CurrentChat
            openedObject={{ opened, setOpened }}
            openedUserId={openedUserId}
            chatName={openedName}
            openedPfp={openedPfp}
          />
        </div>
      );
    });
    return (
      <Fragment>
        {avatars}
        <MotionAddAvatar whileTap={{ scale: 0.7 }} />
        {avatars.length <= 5 ? (
          <Fragment>
            <EmptyAvatar />
            <EmptyAvatar />
          </Fragment>
        ) : null}
      </Fragment>
    );
  } catch (_err) {
    return (
      <Fragment>
        <AddPersonAvatar />
        <EmptyAvatar />
        <EmptyAvatar />
        <EmptyAvatar />
        <EmptyAvatar />
      </Fragment>
    );
  }
};

const ChatsSection = (props: any) => {
  return (
    <div className="chatsSectionContainer" {...props}>
      <LoadingScreen />
      <AllAvatars
        whileTap={{ scale: 0.7 }}
        style={{
          position: "relative",
        }}
      />
    </div>
  );
};
export default ChatsSection;
