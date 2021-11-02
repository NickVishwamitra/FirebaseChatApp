import {
  Autocomplete,
  Avatar,
  Group,
  Text,
  Input,
  LoadingOverlay,
  Popover,
  TextInput,
} from "@mantine/core";
import { Button } from "@mui/material";
import { useCycle } from "framer-motion";
import { forwardRef, Fragment, useEffect, useState } from "react";
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
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
let useridregistered = "";
const firebaseApp = initializeApp(firebaseConfig);

const Dashboard = () => {
  const auth = getAuth();
  const firebaseDB = getDatabase();
  document.body.style.overflow = "hidden";
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [visible, setVisible] = useState("visible");
  const [searchData, setSearchData] = useState<any>([]);
  const [userProfileCreated, setUserProfileCreated] = useState(false);
  const history = useHistory();

  get(ref(firebaseDB, `userdata/${auth.currentUser?.uid}/name`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setUserProfileCreated(true);
      } else {
        setUserProfileCreated(false);
      }
    })
    .catch((_err) => {});

  const onSearchChange = (e: any) => {
    try {
      const searchRef = ref(firebaseDB, `userdata/`);

      onValue(searchRef, (snapshot: any) => {
        const data = snapshot.val();

        const allSearchUsersInfo = Object.values(data).filter((obj: any) =>
          obj.name?.toLowerCase().includes(e.toLowerCase())
        );

        const searchArray = allSearchUsersInfo.map((user: any) => {
          return { value: user.name, image: user.profilepic };
        });

        setSearchData(searchArray);
      });
    } catch (err) {}
  };

  const AutoCompleteItem = forwardRef<any>(
    ({ value, image, ...others }: any, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text style={{ color: "#FFF" }}>
              {value[0].toUpperCase() + value.substring(1)}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  return (
    <div className="dashboardPage">
      <Navigtation openObject={{ isOpen, setIsOpen }} />

      {!userProfileCreated ? (
        <NewProfileModal isOpen={{ modalIsOpen, setModalIsOpen }} />
      ) : null}
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
        data={searchData}
        onDropdownOpen={() => setVisible("none")}
        onDropdownClose={() => setVisible("flex")}
        onChange={onSearchChange}
        itemComponent={AutoCompleteItem}
      ></Autocomplete>

      <ChatsSection style={{ display: visible }} />
      <Feed style={{ display: visible }} />
    </div>
  );
};

export default Dashboard;
