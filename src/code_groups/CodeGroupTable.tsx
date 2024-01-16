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
import { fetchCodeGroups } from "./codeGroupSlice";

export function CodeGroupTable() {
  const { codeGroupList } = useAppSelector((state) => state.codeGroupsReducer);
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentProjectId && dispatch(fetchCodeGroups());
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Nazwa</TableCell>
            <TableCell>Cytaty</TableCell>
            <TableCell>Kody</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {codeGroupList.map((codeGroup, index) => (
            <TableRow>
              <TableCell></TableCell>
              <TableCell>{codeGroup.name}</TableCell>
              <TableCell>ilość cytatów</TableCell>
              <TableCell>ilość kodów</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
