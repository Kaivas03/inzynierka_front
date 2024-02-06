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
import { deleteCodeGroup, fetchCodeGroups } from "./codeGroupSlice";
import OptionsMenu from "../utils/OptionsMenu";
import CodeGroupEditDialog from "./CodeGroupEditDialog";
import { CodeGroup } from "./codeGroupTypes";

export function CodeGroupTable() {
  const { codeGroupList } = useAppSelector((state) => state.codeGroupsReducer);
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentProjectId && dispatch(fetchCodeGroups());
    // eslint-disable-next-line
  }, []);

  function MyRow(codeGroup: CodeGroup) {
    const [editOpen, setEditOpen] = useState<boolean>(false);

    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>{codeGroup.name}</TableCell>
        <TableCell>ilość cytatów</TableCell>
        <TableCell>ilość kodów</TableCell>
        <TableCell>
          <OptionsMenu
            onDelete={() => dispatch(deleteCodeGroup(codeGroup.id))}
            openEditDialog={() => setEditOpen(true)}
          />
        </TableCell>
        <CodeGroupEditDialog
          codeGroup={codeGroup}
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
            <TableCell>Nazwa</TableCell>
            <TableCell>Cytaty</TableCell>
            <TableCell>Kody</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {codeGroupList.map((codeGroup, index) => {
            return MyRow(codeGroup);
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
