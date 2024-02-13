import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { SlOptionsVertical } from "react-icons/sl";
import { BiEdit } from "react-icons/bi";
import { GiSightDisabled } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "react-modal";

export default function SpecificTaskMore() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "30%",
      height: "25%",
      borderRadius: "1rem",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      rowGap: "1rem",
      justifyContent: "center",
      paddingLeft: "2rem",
      paddingRight: "2rem",
      fontFamily: "EuclidMedium"
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.25)",
      // marginBottom: '4rem',
      zIndex: "999",
    },
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div
              style={{
                border: "1px solid rgba(132, 147, 178, 1)",
                padding: "0.5rem 0.6rem",
                borderRadius: "0.5rem",
              }}
            >
              <SlOptionsVertical color="rgba(132, 147, 178, 1)" />
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            boxShadow: "0px 4px 32px 0px rgba(61, 70, 112, 0.14)",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            // "&::before": {
            //   content: '""',
            //   display: "block",
            //   position: "absolute",
            //   top: 0,
            //   right: 14,
            //   width: 10,
            //   height: 10,
            //   bgcolor: "background.paper",
            //   transform: "translateY(-50%) rotate(45deg)",
            //   zIndex: 0,
            // },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <BiEdit /> Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <GiSightDisabled />
          Deactivate
        </MenuItem>
        <MenuItem onClick={handleModalOpen}>
          <RiDeleteBin6Line /> Archive
        </MenuItem>
        {/* <Divider /> */}
      </Menu>
      <Modal
        isOpen={openModal}
        onAfterOpen={handleModalOpen}
        onAfterClose={handleClose}
        style={customStyles}
      >
        <div className="are-u-sure-text">Are you sure ?</div>
        <div className="archive">you want to archive this task</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "1rem",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <div className="cancel-btn" onClick={handleModalClose}>
            Cancel
          </div>
          <div className="confirm-btn">Confirm</div>
        </div>
      </Modal>
    </React.Fragment>
  );
}

// import React from 'react'

// export default function SpecificTaskMore() {
//   return (
//     <div>SpecificTaskMore</div>
//   )
// }

