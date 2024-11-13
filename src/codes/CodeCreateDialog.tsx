import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../store";
import { useState } from "react";
import { createCode } from "./codeSlice";
import CodeGroupSingleSelect from "../utils/CodeGroupSingleSelect";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CodeCreateDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [codeName, setCodeName] = useState<string | null>("");
  const [codeGroupId, setCodeGroupId] = useState<number | undefined>(undefined);
  const newProject = () => {
    dispatch(createCode(codeName, codeGroupId));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Dodaj nowy kod</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa kodu..."
            variant="standard"
            onChange={(e) => setCodeName(e.target.value)}
          />
        </Grid>
        <Grid container direction={"column"} marginTop={1}>
          <Typography marginTop={1}>
            <b>Dodaj do grupy kodów:</b>
          </Typography>
          <CodeGroupSingleSelect
            defaultCodeGroupId={undefined}
            setSelectedCodeGroupId={(e: number | undefined) =>
              setCodeGroupId(e)
            }
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={newProject}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
