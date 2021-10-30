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
import { useRealmApp } from "../../RealmApp";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Loading } from "@nextui-org/react";
import LoadingScreen from "../LoadingScreen";

const getchats = gql`
  query ($userid: String) {
    userChat(query: { userid: $userid }) {
      _id
      name
      userid
      chats {
        chatuserid
      }
    }
  }
`;
const getAllProfilepicsAndIds = gql`
  query {
    userChats {
      userid
      profilepic
      name
    }
  }
`;

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
  const realmApp = useRealmApp();
  const mongodb = realmApp.currentUser?.mongoClient("messenger");
  const chats = mongodb?.db("chats").collection<any>("userChats");
  const currentUserid = realmApp.currentUser?.id;
  const userString = currentUserid?.toString();

  const allUserChats = useQuery(getchats, {
    variables: { userid: currentUserid },
  });
  const getAllChats = useQuery(getAllProfilepicsAndIds, {});
  const allProfiles = useQuery(getchats, {});

  try {
    const allProfilePics = allUserChats.data?.userChat.chats.map(
      (chat: any) => {
        const otherId = chat.chatuserid;
        const allChats = getAllChats.data;
        const thisUsersChats = allChats.userChats.find(
          (e: any) => e.userid == otherId
        );

        return thisUsersChats.profilepic;
      }
    );

    const allAvatars = allProfilePics.map((e: any, index: any) => {
      const name = getAllChats.data.userChats
        .find((chat: any) => chat.profilepic == allProfilePics[index])
        .name.split(" "[0])[0];
      return (
        <div>
          <p
            style={{
              marginBottom: "5%",
              marginTop: " 0",
              color: "white",
              fontSize: "0.75rem",
            }}
          >
            {name}
          </p>
          <MotionUserAvatar {...props} src={e}></MotionUserAvatar>
        </div>
      );
    });

    return (
      <Fragment>
        {[...allAvatars]}
        <MotionAddAvatar whileTap={{ scale: 0.7 }} />
      </Fragment>
    );
  } catch (err) {
    return (
      <Fragment>
        <MotionAddAvatar whileTap={{ scale: 0.7 }} />
        <EmptyAvatar></EmptyAvatar>
        <EmptyAvatar></EmptyAvatar>
      </Fragment>
    );
  }
};

const ChatsSection = (props: any) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="chatsSectionContainer">
      <LoadingScreen />
      <AllAvatars
        whileTap={{ scale: 0.7 }}
        onTap={() => setOpened(true)}
        style={{
          position: "relative",
        }}
      />
      <EmptyAvatar />
      <CurrentChat openedObject={{ opened, setOpened }} />
    </div>
  );
};
export default ChatsSection;
