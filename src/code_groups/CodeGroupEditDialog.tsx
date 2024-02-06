import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../store";
import { useState } from "react";
import { editCodeGroup } from "./codeGroupSlice";
import { CodeGroup } from "./codeGroupTypes";

type Props = {
  codeGroup: CodeGroup;
  open: boolean;
  onClose: () => void;
};

export default function CodeGroupEditDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [codeGroupName, setCodeGroupName] = useState<string | null>(
    props.codeGroup.name
  );
  const onEditCodeGroup = () => {
    dispatch(editCodeGroup(props.codeGroup.id, codeGroupName));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Edytuj grupę kodów</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa grupy..."
            variant="standard"
            defaultValue={props.codeGroup.name}
            onChange={(e) => setCodeGroupName(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={onEditCodeGroup}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}
