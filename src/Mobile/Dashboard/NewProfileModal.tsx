import { Icon } from "@blueprintjs/core";
import { ModalUnstyled } from "@mui/core";
import { Button, ButtonProps, Fade, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box, styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import "./Dashboard.scss";
import { useHistory } from "react-router";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { firebaseConfig } from "../../firebase";
import { getAuth } from "@firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getDatabase();
const auth = getAuth();
const writeUserData = (
  userid: string,
  name: string,
  email: string,
  profilepic: string,
  phone: any,
  username: string
) => {
  set(ref(firebaseDB, `userdata/${userid}`), {
    username: username,
    email: email,
    profilepic: profilepic,
    name: name,
    phone: phone,
    userid: userid,
  });
};

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "100%",
    color: "#FFF",
    "&.Mui-focused fieldset": {
      borderColor: "#00fda0",
      borderWidth: "3px",
    },
    "& fieldset": {
      borderColor: "#00fda0",
      color: "#FFF",
    },
    "&:hover fieldset": {
      borderColor: "#00fda0",
    },
  },
});

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 5vh;
  left: 0;
  display: flex;
  justify-content: center;
  border: none;
`;

const Backdrop = styled("div")`
  z-index: 40;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#FFF",
  height: "3em",
  width: "8em",
  fontSize: "0.5em",
  backgroundColor: "#00b472",
  "&:hover": {
    backgroundColor: "#008051",
  },
  justifySelf: "flex-start",
  marginTop: "5%",
}));

const NewProfileModal = (props: any) => {
  const inputFile = useRef<any>(null);
  const nameForm = useRef<any>();
  const phoneForm = useRef<any>();
  const usernameForm = useRef<any>();
  const { modalIsOpen, setModalIsOpen } = props.isOpen;
  const [file, setFile] = useState("");
  const [display, setDisplay] = useState("none");
  const [isRegistered, setisRegistered] = useState(false);
  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);
  const history = useHistory();

  const checkRegistered = () => {
    const userid = auth.currentUser?.uid || null;
    const userdataref = ref(firebaseDB, `userdata/${userid}`);
    onValue(userdataref, (snapshot: any) => {
      const data = snapshot.val();
      try {
        data.userid === userid
          ? setisRegistered(true)
          : console.log("User Not Registered");
      } catch (_err) {}
    });
  };
  const style = {
    borderRadius: "1%",
    width: "70vw",
    height: "70vh",
    minHeight: "500px",
    bgcolor: "#1C2127",
    p: 2,
    px: 4,
    pb: 3,
  };

  const insertUser = () => {
    try {
      const username = usernameForm.current?.value;
      const phone = phoneForm.current?.value;
      const name = nameForm.current?.value;
      const profilepic = file;
      const userid = String(auth.currentUser?.uid);
      const email = String(auth.currentUser?.email);

      writeUserData(userid, name, email, profilepic, phone, username);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element

    inputFile.current!.click();
  };

  const handleFileSelected = (e: any) => {
    const files = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event: any) {
      const ttj = event.target?.result;
      setFile(ttj);
    };
    reader.readAsDataURL(files);
  };

  useEffect(() => {
    checkRegistered();
  });
  console.log(isRegistered);
  setTimeout(() => {
    setDisplay("flex");
  }, 2500);
  return !isRegistered ? (
    <Backdrop>
      <StyledModal
        style={{ display: display }}
        open={modalIsOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={
          {
            // timeout: 500,
          }
        }
      >
        <Fade in={modalIsOpen}>
          <Box sx={style} className="addUserBox">
            <h2
              id="unstyled-modal-title"
              style={{ textAlign: "center", marginBottom: "2%" }}
            >
              Create Your Profile
            </h2>

            <div className="picCircle" onClick={onButtonClick}>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={handleFileSelected}
              />

              {file ? (
                <img src={file} className="profileImg" />
              ) : (
                <Icon icon="plus" size={45} color="#404854" />
              )}
            </div>
            <div
              style={{
                marginTop: "2%",
                display: "flex",
                flexDirection: "column",
                gap: "2vh",
              }}
            >
              <CssTextField
                label="Name"
                inputRef={nameForm}
                InputLabelProps={{
                  className: "inputfield",
                  style: { color: "#fff" },
                }}
                required
              />
              <CssTextField
                label="Phone Number"
                type="number"
                inputRef={phoneForm}
                InputLabelProps={{
                  className: "inputfield",
                  style: { color: "#fff" },
                }}
              />
              <CssTextField
                label="Username"
                inputRef={usernameForm}
                InputLabelProps={{
                  className: "inputfield",
                  style: { color: "#fff" },
                }}
              />
            </div>

            <ColorButton onClick={insertUser}>SAVE</ColorButton>
          </Box>
        </Fade>
      </StyledModal>
    </Backdrop>
  ) : null;
};
export default NewProfileModal;
