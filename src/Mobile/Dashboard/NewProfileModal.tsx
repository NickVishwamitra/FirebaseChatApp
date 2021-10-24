import { Icon } from "@blueprintjs/core";
import { ModalUnstyled } from "@mui/core";
import { Button, ButtonProps, Fade, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box, styled } from "@mui/system";
import { useRef, useState } from "react";
import "./Dashboard.css";

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

const NewProfileModal = () => {
  const inputFile = useRef<any>(null);

  const [open, setOpen] = useState(true);
  const [file, setFile] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const style = {
    borderRadius: "1%",
    width: "70vw",
    height: "50vh",
    bgcolor: "#1C2127",
    p: 2,
    px: 4,
    pb: 3,
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current!.click();
  };
  const handleSave = () => {
    handleClose();
  };

  const handleFileSelected = (e: any) => {
    const files = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event: any) {
      //   console.log(e.target?.result);
      const ttj = event.target?.result;
      setFile(ttj);
      console.log(ttj);
    };
    reader.readAsDataURL(files);
  };

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#FFF",
    height: "3em",
    width: "5em",
    position: "absolute",
    fontSize: "0.5em",
    backgroundColor: "#00b472",
    "&:hover": {
      backgroundColor: "#008051",
    },
    left: "75vw",
  }));
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
            <ColorButton onClick={handleSave}>SAVE</ColorButton>
            <h2 id="unstyled-modal-title">Create Your Profile</h2>
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
                marginTop: "3.5%",
                display: "flex",
                flexDirection: "column",
                gap: "1vh",
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
          </Box>
        </Fade>
      </StyledModal>
    </Backdrop>
  ) : null;
};
export default NewProfileModal;
