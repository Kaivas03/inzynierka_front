import { AppBar, Grid, IconButton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentInterviewId } from "./interviewsSlice";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function CurrentInterviewBar() {
  const dispatch = useAppDispatch();
  const { currentInterviewName } = useAppSelector(
    (state) => state.interviewReducer
  );

  return (
    <AppBar position="sticky" color="default">
      <Grid container spacing={1}>
        <Grid item margin={1}>
          <IconButton
            onClick={() => dispatch(setCurrentInterviewId(undefined))}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Grid>
        <Grid item margin={1}>
          <Typography variant="h5">{currentInterviewName}</Typography>
        </Grid>
      </Grid>
    </AppBar>
  );
}
