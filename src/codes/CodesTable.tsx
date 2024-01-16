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

export function InterviewTable() {
  const { interviewsList } = useAppSelector((state) => state.interviewReducer);
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentProjectId && dispatch(fetchInterviews());
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Tytuł</TableCell>
            <TableCell>Cytaty</TableCell>
            <TableCell>Kody</TableCell>
            <TableCell>Grupy Kodów</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
