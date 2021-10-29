import "./Dashboard.scss";
import { PlusIcon } from "@modulz/radix-icons";
import { Avatar, Card, Popover, Tooltip, useMantineTheme } from "@mantine/core";
import { forwardRef, Ref, useEffect, useState } from "react";
import { motion } from "framer-motion";
import CurrentChat from "./CurrentChat/CurrentChat";
import { useRealmApp } from "../../RealmApp";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
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
  >
    <PlusIcon style={{ transform: "scale(1.5)", color: "#00b472" }} />
  </Avatar>
));

const MotionAddAvatar = motion(AddPersonAvatar);

const EmptyAvatar = forwardRef((props: any, ref: any) => (
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
    >
      <p></p>
    </Avatar>
  </div>
));
const MotionUserAvatar = motion(UserAvatar);

const AllAvatars = () => {
  const [allChatsOfCurrentUser, setAllChatsOfCurrentUser] = useState([]);
  const [chatUserIds, setChatUserIds] = useState([]);
  const realmApp = useRealmApp();
  const mongodb = realmApp.currentUser?.mongoClient("messenger");
  const chats = mongodb?.db("chats").collection<any>("userChats");
  const currentUserid = realmApp.currentUser?.id;
  const getchats = gql`
    query {
      userChat {
        _id
        chats {
          chatuserid
          chatmessages {
            fromuserid
            themessage
            time
          }
        }
      }
    }
  `;
  const userString = currentUserid?.toString();
  let { data } = useQuery(getchats, {
    pollInterval: 500,
  });
  data = useQuery(getchats, {
    pollInterval: 500,
  });
  useEffect(() => {
    try {
      const allChatData = data.userChat.chats;
      setAllChatsOfCurrentUser(allChatData);
      const allIdData = allChatData.map((userid: any) => {
        return userid.chatuserid;
      });

      setChatUserIds(allIdData);
      console.log(allChatData);
      console.log(allIdData);
    } catch (err) {
      console.log(err);
    }
  }, [data]);
  return <MotionUserAvatar className="tesifai"></MotionUserAvatar>;
};

const ChatsSection = (props: any) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="chatsSectionContainer">
      {/* <AllAvatars /> */}
      <MotionAddAvatar
        whileTap={{ scale: 0.7 }}
        onTap={() => setOpened(true)}
      />
      <EmptyAvatar />
      <EmptyAvatar />
      <EmptyAvatar />
      <EmptyAvatar />
      <EmptyAvatar />
      <CurrentChat openedObject={{ opened, setOpened }} />
    </div>
  );
};
export default ChatsSection;
