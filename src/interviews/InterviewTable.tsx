import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  deleteInterview,
  fetchInterviews,
  setCurrentInterviewId,
  setCurrentInterviewName,
} from "./interviewsSlice";
import { useParams } from "react-router-dom";
import OptionsMenu from "../utils/OptionsMenu";
import InterviewEditDialog from "./InterviewEditDialog";
import { Interview } from "./interviewsTypes";

type Prop = { interview: Interview };

function MyTableRow(prop: Prop) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell
        sx={{ cursor: "pointer" }}
        onClick={() => {
          dispatch(setCurrentInterviewId(prop.interview.id));
          dispatch(
            setCurrentInterviewName({
              name: prop.interview.name,
              text: prop.interview.text,
            })
          );
        }}
      >
        <b>{prop.interview.name.toUpperCase()}</b>
      </TableCell>
      <TableCell>ilość cytatów</TableCell>
      <TableCell>ilość kodów</TableCell>
      <TableCell>ilość grup kodów</TableCell>
      <TableCell>
        <OptionsMenu
          onDelete={() => dispatch(deleteInterview(prop.interview.id))}
          openEditDialog={() => setEditOpen(true)}
        />
      </TableCell>
      <InterviewEditDialog
        interview={prop.interview}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </TableRow>
  );
}

export function InterviewTable() {
  const { interviewsList } = useAppSelector((state) => state.interviewReducer);
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string | undefined }>();

  useEffect(() => {
    projectId && dispatch(fetchInterviews());
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Tytuł</TableCell>
            <TableCell>Cytaty</TableCell>
            <TableCell>Kody</TableCell>
            <TableCell>Grupy Kodów</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interviewsList.map((interview, index) => (
            <MyTableRow interview={interview} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
