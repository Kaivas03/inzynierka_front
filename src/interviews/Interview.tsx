import { Grid, Paper, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import QuotationCard from "./quotation/QuotationCard";
import { useEffect } from "react";
import { fetchQuotationList } from "./quotation/quotationSlice";

export default function Interview() {
  const dispatch = useAppDispatch();
  const { currentInterviewText, currentInterviewId } = useAppSelector(
    (state) => state.interviewReducer
  );
  const { quotationList } = useAppSelector((state) => state.quotationReducer);

  useEffect(() => {
    currentInterviewId && dispatch(fetchQuotationList());
    // eslint-disable-next-line
  }, [currentInterviewId]);

  return (
    <Grid container margin={1} direction={"row"} spacing={1}>
      <Grid item xs={9}>
        <Paper>
          <TextField
            defaultValue={currentInterviewText}
            disabled
            multiline
            fullWidth
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>
          <Grid container spacing={1} sx={{ marginTop: "1rem" }}>
            {quotationList.map((quotation, index) => (
              <Grid item xs={12}>
                <QuotationCard quotation={quotation} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
