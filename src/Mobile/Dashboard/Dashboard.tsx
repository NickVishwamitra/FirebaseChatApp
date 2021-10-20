import { Button } from "@mui/material";
import { useCycle } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router";
import { useRealmApp } from "../../RealmApp";
import "./Dashboard.css";
import { Navigtation } from "./NavMenu/Navigation";
const Dashboard = () => {
  document.body.style.overflow = "hidden";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboardPage">
      <Navigtation openObject={{ isOpen, setIsOpen }} />
    </div>
  );
};

export default Dashboard;
