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
import { editQuotation } from "./quotationSlice";
import {
  NumberFormatValues,
  NumericFormat,
  SourceInfo,
} from "react-number-format";
import { Quotation } from "../interviewsTypes";

type Props = {
  quotation: Quotation;
  open: boolean;
  onClose: () => void;
};

export default function QuotationEditDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [quotationText, setQuotationText] = useState<string | null>(
    props.quotation.text
  );
  const [lineNumber, setLineNumber] = useState<number | null>(
    props.quotation.lineNumber
  );
  const onEditQuotation = () => {
    dispatch(editQuotation(props.quotation.id, quotationText, lineNumber, 0));
    props.onClose();
  };
  const handleValueChange = (values: NumberFormatValues, info: SourceInfo) => {
    const { value } = values;
    if (info.source === "event") {
      setLineNumber(Number(value));
    }
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Edytuj cytat</DialogTitle>
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
            defaultValue={props.quotation.lineNumber}
          />
        </Grid>
        <Grid marginTop={2} width={500}>
          <TextField
            label="Tekst cytatu..."
            fullWidth
            multiline
            defaultValue={props.quotation.text}
            onChange={(e) => setQuotationText(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={onEditQuotation}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}
