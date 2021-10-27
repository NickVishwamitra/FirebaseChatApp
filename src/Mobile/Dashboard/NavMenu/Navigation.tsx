import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { NavContents } from "./NavContents";
import { useContext } from "react";
import "./NavStyles.css";
import { ClickAwayListener } from "@mui/material";
import * as Realm from "realm-web";
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 50px 60px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Navigtation = (props: any) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const { isOpen, setIsOpen } = props.openObject;
  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsOpen(false);
      }}
    >
      <motion.nav
        style={isOpen ? { zIndex: 999 } : { zIndex: 0 }}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div
          className="background"
          variants={sidebar}
          style={{ backgroundColor: "#262626" }}
        />
        {isOpen ? (
          <NavContents
            skillRef={props.skillRef}
            contactRef={props.contactRef}
          />
        ) : null}
        <MenuToggle openObject={props.openObject} />
      </motion.nav>
    </ClickAwayListener>
  );
};
