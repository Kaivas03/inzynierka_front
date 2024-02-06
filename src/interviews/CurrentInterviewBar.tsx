import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentInterviewId } from "./interviewsSlice";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import QuotationCreateDialog from "./quotation/QuotationCreateDialog";
import { useState } from "react";

export default function CurrentInterviewBar() {
  const dispatch = useAppDispatch();
  const { currentInterviewName } = useAppSelector(
    (state) => state.interviewReducer
  );
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <IconButton
          onClick={() => dispatch(setCurrentInterviewId(undefined))}
          edge="start"
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          {currentInterviewName}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Dodaj Cytat
        </Button>
        <QuotationCreateDialog open={open} onClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
}
