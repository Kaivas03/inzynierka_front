import {
  AppBar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import HypothesisDialog from "../mind_map/HypothesisDialog";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentHypothesisId } from "../mind_map/hypothesisSlice";
import { HypothesisItem } from "../mind_map/hypothesisTypes";

export default function SimpleTab() {
  const [openn, setOpenn] = useState(false);
  const { currentHypothesisId, hypothsesisList } = useAppSelector(
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
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            size="small"
            disabled
          >
            Zapisz pozycję
          </Button>
        </Grid>
        <Grid item margin={1}>
          <FormControl size="small" sx={{ minWidth: 240 }}>
            <TextField
              select
              variant="standard"
              onChange={(e) =>
                dispatch(setCurrentHypothesisId(parseInt(e.target.value)))
              }
              fullWidth
            >
              <MenuItem value={undefined}>-</MenuItem>
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
