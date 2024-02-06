import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store";
import { createQuotation } from "./quotationSlice";
import {
  NumberFormatValues,
  NumericFormat,
  SourceInfo,
} from "react-number-format";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function QuotationDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [quotationText, setQuotationText] = useState<string | null>("");
  const [lineNumber, setLineNumber] = useState<number | null>(null);
  const newProject = () => {
    dispatch(createQuotation(quotationText, lineNumber));
    props.onClose();
  };
  const handleValueChange = (values: NumberFormatValues, info: SourceInfo) => {
    const { value } = values;
    if (info.source === "event") setLineNumber(Number(value));
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Dodaj nowy cytat</DialogTitle>
      <DialogContent>
        <Grid>
          <NumericFormat
            customInput={TextField}
            label="Numer linijki..."
            size="small"
            onValueChange={handleValueChange}
            allowNegative={false}
            thousandSeparator=" "
            decimalScale={0}
          />
        </Grid>
        <Grid marginTop={2} width={500}>
          <TextField
            label="Tekst cytatu..."
            fullWidth
            multiline
            onChange={(e) => setQuotationText(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={newProject}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}