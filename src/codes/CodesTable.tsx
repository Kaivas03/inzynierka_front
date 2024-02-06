import {
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
import { fetchCodeList } from "./codeSlice";
import OptionsMenu from "../utils/OptionsMenu";

export function CodeTable() {
  const { codesList } = useAppSelector((state) => state.codesReducer);
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentProjectId && dispatch(fetchCodeList());
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
            <TableCell>Grupy Kodów</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {codesList.map((code, index) => (
            <TableRow>
              <TableCell></TableCell>
              <TableCell>{code.name}</TableCell>
              <TableCell>ilość cytatów</TableCell>
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
