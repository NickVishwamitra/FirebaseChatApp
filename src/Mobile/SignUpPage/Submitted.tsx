import { motion } from "framer-motion";
import "./SignUp.css";
import { Check } from "phosphor-react";
const Submitted = (props: any) => {
  return (
    <div className="submittedBox">
      <motion.p
        style={{ color: "#FFF", marginBottom: "4vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Registration Successful
      </motion.p>
      <motion.div
        className="circle"
        animate={{ scale: [0, 1.3, 1.1] }}
        transition={{ duration: 0.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <motion.path
            d="M 6 18 L 13.5 25.5 L 30 9"
            fill="transparent"
            strokeWidth="5"
            stroke="#FFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.25 }}
          ></motion.path>
        </svg>
      </motion.div>
      <motion.p
        style={{ color: "#868e96", fontSize: "0.6em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Redirecting you to login page
      </motion.p>
    </div>
  );
};
export default Submitted;
