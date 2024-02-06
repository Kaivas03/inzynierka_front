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
import { deleteCode, fetchCodeList } from "./codeSlice";
import OptionsMenu from "../utils/OptionsMenu";
import CodeEditDialog from "./CodeEditDialog";
import { Code } from "./codeTypes";

export function CodeTable() {
  const { codesList } = useAppSelector((state) => state.codesReducer);
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentProjectId && dispatch(fetchCodeList());
    // eslint-disable-next-line
  }, []);

  function MyRow(code: Code) {
    const [editOpen, setEditOpen] = useState<boolean>(false);

    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>{code.name}</TableCell>
        <TableCell>ilość cytatów</TableCell>
        <TableCell>ilość grup kodów</TableCell>
        <TableCell>
          <OptionsMenu
            onDelete={() => dispatch(deleteCode(code.id))}
            openEditDialog={() => setEditOpen(true)}
          />
        </TableCell>
        <CodeEditDialog
          code={code}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      </TableRow>
    );
  }

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
          {codesList.map((code, index) => {
            return MyRow(code);
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
