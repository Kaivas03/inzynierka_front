import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import OptionsMenu from "../../utils/OptionsMenu";
import { useAppDispatch } from "../../store";
import { deleteQuotation, editQuotation } from "./quotationSlice";
import { Quotation } from "../interviewsTypes";
import { useState } from "react";
import {
  NumberFormatValues,
  NumericFormat,
  SourceInfo,
} from "react-number-format";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CodeSingleSelect from "../../utils/CodeSingleSelect";

type Props = {
  quotation: Quotation;
};

export default function QuotationCard(props: Props) {
  const { quotation } = props;
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [quotationText, setQuotationText] = useState<string | null>(
    quotation.text
  );
  const [lineNumber, setLineNumber] = useState<number | null>(
    quotation.lineNumber
  );
  const [codeId, setCodeId] = useState<number | undefined>(quotation.codeId);
  const onEditQuotation = () => {
    dispatch(editQuotation(quotation.id, quotationText, lineNumber, codeId));
    setEditOpen(false);
  };
  const handleValueChange = (values: NumberFormatValues, info: SourceInfo) => {
    const { value } = values;
    if (info.source === "event") {
      setLineNumber(Number(value));
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          editOpen ? (
            <Typography>Edycja cytatu</Typography>
          ) : (
            <Typography>{`Numer linijki: ${quotation.lineNumber}`}</Typography>
          )
        }
        action={
          editOpen ? (
            <Grid container direction={"row"}>
              <Grid>
                <IconButton onClick={() => setEditOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid>
                <IconButton onClick={onEditQuotation}>
                  <CheckIcon />
                </IconButton>
              </Grid>
            </Grid>
          ) : (
            <OptionsMenu
              onDelete={() => dispatch(deleteQuotation(quotation.id))}
              openEditDialog={() => setEditOpen(true)}
            />
          )
        }
      />
      <CardContent>
        {editOpen ? (
          <Grid container direction={"column"}>
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
                defaultValue={props.quotation.text}
                multiline
                onChange={(e) => setQuotationText(e.target.value)}
              />
            </Grid>
            <CodeSingleSelect
              defaultCodeId={quotation.codeId}
              setSelectedCodeId={(e: number | undefined) => setCodeId(e)}
            />
          </Grid>
        ) : (
          <Grid container direction={"column"}>
            <Grid item marginBottom={2}>
              <Typography>{`"${quotation.text}"`}</Typography>
            </Grid>
            <Grid item>
              <Typography>
                <b>Kod:</b>
              </Typography>
              {quotation.codeId && (
                <Chip label={quotation.codeName} variant="outlined" />
              )}
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
