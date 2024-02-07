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
import { deleteCode, fetchCodeList } from "./codeSlice";
import OptionsMenu from "../utils/OptionsMenu";
import CodeEditDialog from "./CodeEditDialog";
import { Code } from "./codeTypes";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

type Prop = { code: Code };

function MyRow(prop: Prop) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell sx={{ cursor: "pointer" }} onClick={() => setEditOpen(true)}>
        {prop.code.name}
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" gap={1}>
          <FormatQuoteIcon color="action" />
          <Typography variant="body1">{prop.code.quotationAmount}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <OptionsMenu
          onDelete={() => dispatch(deleteCode(prop.code.id))}
          openEditDialog={() => setEditOpen(true)}
        />
      </TableCell>
      <CodeEditDialog
        code={prop.code}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </TableRow>
  );
}

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
            <TableCell>Nazwa</TableCell>
            <TableCell>Cytaty</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {codesList.map((code, index) => (
            <MyRow code={code} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
