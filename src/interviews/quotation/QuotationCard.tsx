import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import OptionsMenu from "../../utils/OptionsMenu";
import { useAppDispatch } from "../../store";
import { deleteQuotation } from "./quotationSlice";
import { Quotation } from "../interviewsTypes";
import { useState } from "react";
import QuotationEditDialog from "./QuotationEditDialog";

type Props = {
  quotation: Quotation;
};

export default function QuotationCard(props: Props) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        title={
          <Typography>Numer linijki: {props.quotation.lineNumber}</Typography>
        }
        action={
          <OptionsMenu
            onDelete={() => dispatch(deleteQuotation(props.quotation.id))}
            openEditDialog={() => setEditOpen(true)}
          />
        }
      />
      <CardContent>
        <Typography>{props.quotation.text}</Typography>
      </CardContent>
      <QuotationEditDialog
        quotation={props.quotation}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </Card>
  );
}
