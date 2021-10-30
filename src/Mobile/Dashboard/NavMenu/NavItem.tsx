import * as React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Button, ButtonProps, buttonUnstyledClasses } from "@mui/material";
import styled from "@emotion/styled";
import { useHistory } from "react-router";
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
const skillsSec = window.visualViewport.height;
const contactSec = window.visualViewport.height * 4;

const colors = ["#03aee5", "#00FFFC", "#2BB673"];
let text = "";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#FFF",
  fontSize: "1em",
  backgroundColor: "#008f5a",
  "&:hover": {
    backgroundColor: "#2BB673",
  },
}));

export const NavItem = ({ props, i }: { i: any; props: any }) => {
  const history = useHistory();
  const clickHandler = (i: any) => {
    setSelected(i);
  };
  const [selected, setSelected] = React.useState(-1);
  const style = {
    border: `2px solid ${colors[i]}`,
    display: "flex",
    justifyContent: "center",
    height: "8vh",
  };

  const logout = async () => {
    // const auth = getAuth();
    // signOut(auth)
    //   .then(() => {
    //     // Sign-out successful.
    //   })
    //   .catch((_error) => {
    //     // An error happened.
    //   });
    history.push("/login");
  };

  let Buttons;
  switch (i) {
    case 0:
      Buttons = (
        <ColorButton variant="contained" fullWidth disableElevation>
          <p>Testing</p>
        </ColorButton>
      );
      break;
    case 1:
      Buttons = (
        <ColorButton variant="contained" fullWidth disableElevation>
          <p>Testing</p>
        </ColorButton>
      );
      break;
    case 2:
      Buttons = (
        <ColorButton variant="contained" fullWidth disableElevation>
          <p>Testing</p>
        </ColorButton>
      );
      break;
    case 4:
      Buttons = (
        <Button variant="contained" color="error" onClick={logout}>
          <p>Log Out</p>
        </Button>
      );
      break;
  }
  React.useEffect(() => {}, [selected]);
  return (
    <motion.li variants={variants} onTap={() => clickHandler(i)}>
      {Buttons}
    </motion.li>
  );
};
