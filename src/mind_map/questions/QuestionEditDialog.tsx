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
import { editQuestion } from "../ReactFlow/mindMapSlice";
import { Code } from "../../codes/codeTypes";
import { CodeGroup } from "../../code_groups/codeGroupTypes";
import { fetchCodeList } from "../../codes/codeSlice";
import { fetchCodeGroups } from "../../code_groups/codeGroupSlice";
import CodeMultiSelect from "../../utils/CodeMultiSelect";
import CodeGroupMultiSelect from "../../utils/CodeGroupMultiSelect";
import { Question } from "../hypothesisTypes";

type Props = {
  question: Question;
  open: boolean;
  onClose: () => void;
};

export default function QuestionEditDialog(props: Props) {
  const { question, open, onClose } = props;
  const dispatch = useAppDispatch();
  const { codeGroupList } = useAppSelector((state) => state.codeGroupsReducer);
  const { codesList } = useAppSelector((state) => state.codesReducer);
  const [questionText, setQuestionText] = useState<string | null>(
    question.text
  );
  const [questionCodeIds, setQuestionCodeIds] = useState<number[]>(
    question.codes.map(({ id }) => id)
  );
  const [questionCodeGroupIds, setQuestionCodeGroupIds] = useState<number[]>(
    question.codeGroups.map(({ id }) => id)
  );

  useEffect(() => {
    dispatch(fetchCodeList());
    dispatch(fetchCodeGroups());
    // eslint-disable-next-line
  }, []);

  const onEditQuestion = () => {
    dispatch(
      editQuestion(
        question.id,
        questionText,
        question.posX,
        question.posY,
        questionCodeIds,
        questionCodeGroupIds
      )
    );
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Edytuj pytanie</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Treść pytania..."
            variant="standard"
            onChange={(e) => setQuestionText(e.target.value)}
            defaultValue={question.text}
          />
        </Grid>
        <Grid>
          <CodeMultiSelect
            setSelectedCodes={(e: Code[]) =>
              setQuestionCodeIds(e.map(({ id }) => id))
            }
            textFieldVariant="outlined"
            codes={codesList}
            initialCodes={question.codes}
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
            initialCodeGroups={question.codeGroups}
            helperText="Dodaj grupy kodów"
            error={false}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={onEditQuestion}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}
