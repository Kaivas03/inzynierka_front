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
import CodeSingleSelect from "../../utils/CodeSingleSelect";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function QuotationCreateDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [quotationText, setQuotationText] = useState<string | null>("");
  const [lineNumber, setLineNumber] = useState<number | null>(null);
  const newQuotation = () => {
    dispatch(createQuotation(quotationText, lineNumber, codeId));
    props.onClose();
  };
  const [codeId, setCodeId] = useState<number | undefined>(undefined);
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
        <CodeSingleSelect
          defaultCodeId={undefined}
          setSelectedCodeId={(e: number | undefined) => setCodeId(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={newQuotation}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
