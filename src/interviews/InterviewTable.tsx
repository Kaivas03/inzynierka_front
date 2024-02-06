import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchInterviews,
  setCurrentInterviewId,
  setCurrentInterviewName,
} from "./interviewsSlice";
import { useParams } from "react-router-dom";
import OptionsMenu from "../utils/OptionsMenu";

export function InterviewTable() {
  const { interviewsList } = useAppSelector((state) => state.interviewReducer);
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string | undefined }>();

  useEffect(() => {
    projectId && dispatch(fetchInterviews(projectId));
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
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    dispatch(setCurrentInterviewId(interview.id));
                    dispatch(
                      setCurrentInterviewName({
                        name: interview.name,
                        text: interview.text,
                      })
                    );
                  }}
                  sx={{ color: "black" }}
                >
                  {interview.name}
                </Button>
              </TableCell>
              <TableCell>ilość cytatów</TableCell>
              <TableCell>ilość kodów</TableCell>
              <TableCell>ilość grup kodów</TableCell>
              <TableCell>
                <OptionsMenu onDelete={() => {}} openEditDialog={() => {}} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
