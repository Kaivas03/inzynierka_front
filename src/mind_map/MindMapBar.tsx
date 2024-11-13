import {
  AppBar,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import HypothesisDialog from "./HypothesisDialog";
import { useAppDispatch, useAppSelector } from "../store";
import { HypothesisItem } from "./hypothesisTypes";
import { setCurrentHypothesisId } from "./hypothesisSlice";

export default function MindMapBar() {
  const [openn, setOpenn] = useState(false);
  const { hypothsesisList, currentHypothesisId } = useAppSelector(
    (state) => state.hypothesisReducer
  );
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpenn(true);
  };

  const handleClose = () => {
    setOpenn(false);
  };

  return (
    <AppBar position="sticky" color="default">
      <Grid container direction={"row"}>
        <Grid item margin={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            onClick={handleClickOpen}
          >
            Dodaj Hipotezę
          </Button>
          <HypothesisDialog open={openn} onClose={handleClose} />
        </Grid>
        <Grid item margin={1}>
          <FormControl size="small" sx={{ minWidth: 240 }}>
            <TextField
              select
              variant="standard"
              defaultValue={currentHypothesisId}
              onChange={(e) =>
                dispatch(setCurrentHypothesisId(parseInt(e.target.value)))
              }
              fullWidth
            >
              {hypothsesisList.length === 0 && (
                <MenuItem onClick={handleClickOpen}>
                  Brak postawionych hipotez.
                </MenuItem>
              )}
              {hypothsesisList?.map((hypothesis: HypothesisItem, index) => (
                <MenuItem key={index} value={hypothesis.id}>
                  {hypothesis.text}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
      </Grid>
    </AppBar>
  );
}
