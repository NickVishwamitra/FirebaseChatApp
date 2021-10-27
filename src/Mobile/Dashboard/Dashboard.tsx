import { gql, useQuery } from "@apollo/client";
import { LoadingOverlay, TextInput } from "@mantine/core";
import { Button } from "@mui/material";
import { useCycle } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRealmApp } from "../../RealmApp";
import "./Dashboard.css";
import { Navigtation } from "./NavMenu/Navigation";
import NewProfileModal from "./NewProfileModal";

import { MagnifyingGlassIcon } from "@modulz/radix-icons";
import ChatsSection from "./ChatsSection";
import CurrentChat from "./CurrentChat";
let useridregistered = "";

const Dashboard = () => {
  document.body.style.overflow = "hidden";
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [overlayLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const realmApp = useRealmApp();
  const currentUserid = realmApp.currentUser?.id;
  const checkIsProfileCreated = gql`
    query ($userid: String!) {
      userinfo(query: { userid: $userid }) {
        userid
      }
    }
  `;

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);
  const { loading, error, data } = useQuery(checkIsProfileCreated, {
    variables: { userid: currentUserid },
  });

  try {
    useridregistered = data.userinfo.userid;
    console.log(useridregistered);
  } catch (err) {}
  return (
    <div className="dashboardPage">
      <Navigtation openObject={{ isOpen, setIsOpen }} />
      {useridregistered ? null : (
        <NewProfileModal isOpen={{ modalIsOpen, setModalIsOpen }} />
      )}
      <div
        className="appTitle"
        onClick={() => {
          history.go(0);
        }}
      >
        Scoop
      </div>
      <TextInput
        className="searchInput"
        styles={{
          input: { color: "#FFF" },
          withIcon: { background: "#252A31", border: "#252A31" },
          icon: { color: "#FFF" },
        }}
        size="xl"
        placeholder="Search for people"
        color="#FFF"
        icon={<MagnifyingGlassIcon />}
        radius="lg"
      ></TextInput>
      <ChatsSection />
      <CurrentChat></CurrentChat>
    </div>
  );
};

export default Dashboard;
