import React, { SyntheticEvent, useEffect } from "react";
import { Slide, Snackbar, SnackbarCloseReason } from "@mui/material";
import { closeSnack, nextSnack, resetMessageInfo } from "./notifycationsSlice";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../store";

export function Notifications() {
  const dispatch = useAppDispatch();
  const { snackPack, open, messageInfo } = useAppSelector(
    (state) => state.notyficationsReducer
  );

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      dispatch(nextSnack());
    } else if (snackPack.length && messageInfo && open) {
      dispatch(closeSnack());
    }
  }, [snackPack, messageInfo, open, dispatch]);

  const handleClose = (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnack());
  };

  const handleAlertClose = (event: Event | SyntheticEvent<any, Event>) => {
    dispatch(closeSnack());
  };

  const handleExited = () => {
    dispatch(resetMessageInfo());
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      transitionDuration={{ enter: 900, exit: 0 }}
      TransitionProps={{
        onExited: handleExited,
      }}
      TransitionComponent={Slide}
    >
      <Alert
        onClose={handleAlertClose}
        severity={messageInfo ? messageInfo.severity : "info"}
      >
        {messageInfo ? messageInfo.message : undefined}
      </Alert>
    </Snackbar>
  );
}
