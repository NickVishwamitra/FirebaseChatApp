import { Icon } from "@blueprintjs/core";
import { ModalUnstyled } from "@mui/core";
import { Button, ButtonProps, Fade, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box, styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { BSON } from "realm-web";
import "./Dashboard.scss";
import * as Realm from "realm-web";
import { useRealmApp } from "../../RealmApp";
import { Services } from "realm";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router";

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
  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);
  const app = useRealmApp();
  const history = useHistory();
  const mongodb = app.currentUser?.mongoClient("messenger");
  const chats = mongodb?.db("chats").collection<any>("userChats");
  type InsertOneResult = Services.MongoDB.InsertOneResult<BSON.ObjectId>;
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

  const addUser = gql`
    mutation (
      $name: String!
      $phone: Float
      $username: String
      $userid: String!
      $profilepic: String
      $email: String
    ) {
      insertOneUserChat(
        data: {
          name: $name
          phone: $phone
          username: $username
          userid: $userid
          profilepic: $profilepic
          email: $email
        }
      ) {
        _id
        userid
        username
        phone
        name
        profilepic
        email
      }
    }
  `;
  const [mutateFunction] = useMutation(addUser);
  const insertUser = () => {
    try {
      mutateFunction({
        variables: {
          name: nameForm.current!.value == "" ? null : nameForm.current!.value,
          username: usernameForm.current!.value,
          phone: Number(phoneForm.current!.value),
          userid: app.currentUser?.id,
          profilepic: file,
          email: app.currentUser?.profile.email,
        },
      });
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

  setTimeout(() => {
    setDisplay("flex");
  }, 1500);
  return modalIsOpen ? (
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
