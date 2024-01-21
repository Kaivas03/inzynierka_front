import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Props = {
  text: string;
  lineNumber: number;
};

export default function QuotationCard(props: Props) {
  return (
    <Card>
      <CardHeader
        title={<Typography>Numer linijki: {props.lineNumber}</Typography>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography>{props.text}</Typography>
      </CardContent>
    </Card>
  );
}
