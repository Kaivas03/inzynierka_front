import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../store";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Interview() {
  const { currentInterviewText } = useAppSelector(
    (state) => state.interviewReducer
  );

  return (
    <Grid container margin={1} direction={"row"} spacing={1}>
      <Grid item xs={9}>
        <Paper>
          <Box component="main" sx={{ p: 3 }}>
            <Typography>{currentInterviewText}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>
          <Card>
            <CardHeader
              title={<Typography>Numer linijki: 4</Typography>}
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography>Coś tam coś tam</Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
}
