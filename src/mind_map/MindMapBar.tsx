import {
  AppBar,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import HypothesisDialog from "./HypothesisDialog";
import { useAppDispatch, useAppSelector } from "../store";
import { HypothesisItem } from "./hypothesisTypes";
import { updatePositions } from "./ReactFlow/store";
// import { useNavigateSok } from "../utils/hooks";
import { useParams } from "react-router-dom";
import { setCurrentHypothesisId } from "./hypothesisSlice";

export default function MindMapBar() {
  const [openn, setOpenn] = useState(false);
  // const navigate = useNavigateSok();
  const { projectId } = useParams<{ projectId: string | undefined }>();
  const { nodesMoved, hypothsesisList } = useAppSelector(
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
            disabled={!nodesMoved}
            onClick={() => dispatch(updatePositions())}
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
                // navigate(`/${projectId}/mind-map/${e.target.value}`)
                dispatch(setCurrentHypothesisId(parseInt(e.target.value)))
              }
              fullWidth
            >
              {/* <MenuItem value={undefined}>-</MenuItem> */}
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
