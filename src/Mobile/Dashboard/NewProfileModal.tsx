import { Icon } from "@blueprintjs/core";
import { ModalUnstyled } from "@mui/core";
import { Button, ButtonProps, Fade, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box, styled } from "@mui/system";
import { useRef, useState } from "react";
import { BSON } from "realm-web";
import "./Dashboard.css";
import * as Realm from "realm-web";
import { useRealmApp } from "../../RealmApp";
import { Services } from "realm";

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

const NewProfileModal = () => {
  const inputFile = useRef<any>(null);
  const nameForm = useRef<any>();
  const phoneForm = useRef<any>();
  const usernameForm = useRef<any>();

  const [open, setOpen] = useState(true);
  const [file, setFile] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const app = useRealmApp();
  console.log();

  const mongodb = app.currentUser?.mongoClient("messenger");
  const users = mongodb?.db("users").collection<any>("userinfo");
  type InsertOneResult = Services.MongoDB.InsertOneResult<BSON.ObjectId>;
  const curUser = app.currentUser?.id;
  const style = {
    borderRadius: "1%",
    width: "70vw",
    height: "70vh",
    minHeight: "70vh",
    bgcolor: "#1C2127",
    p: 2,
    px: 4,
    pb: 3,
  };

  const insertUser = () => {};

  const onButtonClick = () => {
    // `current` points to the mounted file input element

    inputFile.current!.click();
  };
  const handleSave = async () => {
    // const result = await users?.insertOne({
    //   name: "Nick",
    //   userid: curUser,
    //   profileCreated: true,
    // });
    console.log(app.currentUser?.customData);
    handleClose();
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

  return open ? (
    <Backdrop>
      <StyledModal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={
          {
            // timeout: 500,
          }
        }
      >
        <Fade in={open}>
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
                InputLabelProps={{
                  className: "inputfield",
                  style: { color: "#fff" },
                }}
                required
              />
              <CssTextField
                label="Phone Number"
                InputLabelProps={{
                  className: "inputfield",
                  style: { color: "#fff" },
                }}
              />
              <CssTextField
                label="Username"
                InputLabelProps={{
                  className: "inputfield",
                  style: { color: "#fff" },
                }}
              />
            </div>
            <ColorButton onClick={handleSave}>SAVE</ColorButton>
          </Box>
        </Fade>
      </StyledModal>
    </Backdrop>
  ) : null;
};
export default NewProfileModal;
