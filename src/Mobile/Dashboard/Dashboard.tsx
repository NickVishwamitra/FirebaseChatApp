import { useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { useCycle } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { Navigtation } from "./NavMenu/Navigation";
import NewProfileModal from "./NewProfileModal";

const Dashboard = () => {
  document.body.style.overflow = "hidden";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboardPage">
      <Navigtation openObject={{ isOpen, setIsOpen }} />
      <NewProfileModal />
    </div>
  );
};

export default Dashboard;
