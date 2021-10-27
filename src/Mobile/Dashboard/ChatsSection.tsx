import "./Dashboard.css";
import { PlusIcon } from "@modulz/radix-icons";
import { Avatar, Card, Popover, Tooltip, useMantineTheme } from "@mantine/core";
import { useState } from "react";
const AddPersonAvatar = () => (
  <Avatar
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
);
const EmptyAvatar = (props: any) => (
  <Avatar
    {...props}
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
);
const ChatsSection = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="chatsSectionContainer">
      <AddPersonAvatar />
      <EmptyAvatar />
      <EmptyAvatar />
      <EmptyAvatar />
      <EmptyAvatar />
      <EmptyAvatar />
    </div>
  );
};
export default ChatsSection;
