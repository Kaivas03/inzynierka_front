import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addChildNode, createQuestion } from "../ReactFlow/mindMapSlice";
import { Code } from "../../codes/codeTypes";
import { CodeGroup } from "../../code_groups/codeGroupTypes";
import { fetchCodeList } from "../../codes/codeSlice";
import { fetchCodeGroups } from "../../code_groups/codeGroupSlice";
import CodeMultiSelect from "../../utils/CodeMultiSelect";
import CodeGroupMultiSelect from "../../utils/CodeGroupMultiSelect";

type Props = {
  id: string;
  posX: number;
  posY: number;
  open: boolean;
  onClose: () => void;
};

export default function QuestionCreateDialog(props: Props) {
  const { id, posX, posY, open, onClose } = props;
  const dispatch = useAppDispatch();
  const { codeGroupList } = useAppSelector((state) => state.codeGroupsReducer);
  const { codesList } = useAppSelector((state) => state.codesReducer);
  const [questionText, setQuestionText] = useState<string | null>("");
  const [questionCodeIds, setQuestionCodeIds] = useState<number[]>([]);
  const [questionCodeGroupIds, setQuestionCodeGroupIds] = useState<number[]>(
    []
  );

  useEffect(() => {
    dispatch(fetchCodeList());
    dispatch(fetchCodeGroups());
    // eslint-disable-next-line
  }, []);

  const newQuestion = () => {
    dispatch(
      addChildNode(id, questionText ? questionText : "", {
        x: posX,
        y: posY + 200,
      })
    );
    dispatch(
      createQuestion(
        parseInt(id),
        questionText ? questionText : "",
        posX,
        posY + 200,
        questionCodeIds,
        questionCodeGroupIds
      )
    );
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Dodaj nowe pytanie</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Treść pytania..."
            variant="standard"
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Grid>
        <Grid>
          <CodeMultiSelect
            setSelectedCodes={(e: Code[]) =>
              setQuestionCodeIds(e.map(({ id }) => id))
            }
            textFieldVariant="outlined"
            codes={codesList}
            initialCodes={[]}
            helperText="Dodaj kody"
            error={false}
          />
        </Grid>
        <Grid>
          <CodeGroupMultiSelect
            setSelectedCodeGroups={(e: CodeGroup[]) =>
              setQuestionCodeGroupIds(e.map(({ id }) => id))
            }
            textFieldVariant="outlined"
            codeGroups={codeGroupList}
            initialCodeGroups={[]}
            helperText="Dodaj grupy kodów"
            error={false}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={newQuestion}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
