import "./Dashboard.css";
import { PlusIcon } from "@modulz/radix-icons";
import { Avatar } from "@mantine/core";
const AddPersonAvatar = (
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
const EmptyAvatar = (
  <Avatar
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
  return (
    <div className="chatsSectionContainer">
      {AddPersonAvatar}
      {EmptyAvatar}
      {EmptyAvatar}
      {EmptyAvatar}
      {EmptyAvatar}
      {EmptyAvatar}
    </div>
  );
};
export default ChatsSection;
