import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import OptionsMenu from "../../utils/OptionsMenu";

type Props = {
  text: string;
  lineNumber: number;
};

export default function QuotationCard(props: Props) {
  return (
    <Card>
      <CardHeader
        title={<Typography>Numer linijki: {props.lineNumber}</Typography>}
        action={<OptionsMenu onDelete={() => {}} openEditDialog={() => {}} />}
      />
      <CardContent>
        <Typography>{props.text}</Typography>
      </CardContent>
    </Card>
  );
}
