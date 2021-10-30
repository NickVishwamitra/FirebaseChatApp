import {
  Autocomplete,
  Input,
  LoadingOverlay,
  Popover,
  TextInput,
} from "@mantine/core";
import { Button } from "@mui/material";
import { useCycle } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Dashboard.scss";
import { Navigtation } from "./NavMenu/Navigation";
import NewProfileModal from "./NewProfileModal";

import { MagnifyingGlassIcon } from "@modulz/radix-icons";
import ChatsSection from "./ChatsSection";
import Feed from "./Feed/Feed";
import CurrentChat from "./CurrentChat/CurrentChat";
import { Loading } from "@nextui-org/react";
import { firebaseConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
let useridregistered = "";
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getDatabase();
const auth = getAuth();

const checkRegistered = () => {};

const Dashboard = () => {
  document.body.style.overflow = "hidden";
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [visible, setVisible] = useState("visible");
  const [allChats, setAllChats] = useState([]);
  const history = useHistory();

  return (
    <div className="dashboardPage">
      <Navigtation openObject={{ isOpen, setIsOpen }} />

      <NewProfileModal isOpen={{ modalIsOpen, setModalIsOpen }} />
      <div
        className="appTitle"
        onClick={() => {
          history.go(0);
        }}
      >
        Scoop
      </div>

      <Autocomplete
        className="searchInput"
        styles={{
          input: {
            color: "#FFF",
            backgroundColor: "#1D2127",
          },
          // withIcon: { backgroundColor: "red", border: "#252A31" },
          icon: { color: "#FFF" },
          dropdown: {
            height: "30em",
            zIndex: 10000,
            backgroundColor: "#252A31",
            borderColor: "#252A31",
          },
          hovered: {
            backgroundColor: "#00b472",
          },
          item: { color: "white" },
        }}
        size="xl"
        placeholder="Search for people"
        color="#FFF"
        icon={<MagnifyingGlassIcon />}
        radius="lg"
        data={["React", "Angular", "Svelte", "Vue"]}
        onDropdownOpen={() => setVisible("none")}
        onDropdownClose={() => setVisible("flex")}
      ></Autocomplete>

      <ChatsSection style={{ display: visible }} />
      <Feed style={{ display: visible }} />
    </div>
  );
};

export default Dashboard;
