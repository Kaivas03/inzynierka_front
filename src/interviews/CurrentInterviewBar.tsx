import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentInterviewId } from "./interviewsSlice";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";

export default function CurrentInterviewBar() {
  const dispatch = useAppDispatch();
  const { currentInterviewName } = useAppSelector(
    (state) => state.interviewReducer
  );

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
        <Button variant="contained" startIcon={<AddIcon />}>
          Dodaj Cytat
        </Button>
      </Toolbar>
    </AppBar>
  );
}
