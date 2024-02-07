import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteCodeGroup, fetchCodeGroups } from "./codeGroupSlice";
import OptionsMenu from "../utils/OptionsMenu";
import CodeGroupEditDialog from "./CodeGroupEditDialog";
import { CodeGroup } from "./codeGroupTypes";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

type Prop = { codeGroup: CodeGroup };

function MyRow(prop: Prop) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell sx={{ cursor: "pointer" }} onClick={() => setEditOpen(true)}>
        {prop.codeGroup.name}
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" gap={1}>
          <LoyaltyIcon color="action" />
          <Typography variant="body1">{prop.codeGroup.codeAmount}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <OptionsMenu
          onDelete={() => dispatch(deleteCodeGroup(prop.codeGroup.id))}
          openEditDialog={() => setEditOpen(true)}
        />
      </TableCell>
      <CodeGroupEditDialog
        codeGroup={prop.codeGroup}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </TableRow>
  );
}

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
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Nazwa</TableCell>
            <TableCell>Kody</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {codeGroupList.map((codeGroup, index) => (
            <MyRow codeGroup={codeGroup} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
