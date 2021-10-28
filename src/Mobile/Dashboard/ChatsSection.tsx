import "./Dashboard.scss";
import { PlusIcon } from "@modulz/radix-icons";
import { Avatar, Card, Popover, Tooltip, useMantineTheme } from "@mantine/core";
import { forwardRef, Ref, useState } from "react";
import { motion } from "framer-motion";
import CurrentChat from "./CurrentChat/CurrentChat";
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
));

const ChatsSection = (props: any) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="chatsSectionContainer">
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
