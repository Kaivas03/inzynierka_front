import { FormControl, Grid, MenuItem, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { fetchCodeList } from "../codes/codeSlice";
import { Code } from "../codes/codeTypes";

type Props = {
  defaultCodeId: number | undefined;
  setSelectedCodeId: (e: number | undefined) => void;
};

export default function CodeSingleSelect(props: Props) {
  const { defaultCodeId = undefined, setSelectedCodeId } = props;
  const dispatch = useAppDispatch();
  const { codesList } = useAppSelector((state) => state.codesReducer);

  useEffect(() => {
    dispatch(fetchCodeList());
    setSelectedCodeId(defaultCodeId);
    // eslint-disable-next-line
  }, []);

  return (
    <Grid item margin={1}>
      <FormControl size="small" sx={{ minWidth: 240 }}>
        <TextField
          select
          variant="standard"
          defaultValue={defaultCodeId}
          onChange={(e) => setSelectedCodeId(parseInt(e.target.value))}
          fullWidth
        >
          <MenuItem value={undefined}>-</MenuItem>
          {codesList?.map((code: Code, index) => (
            <MenuItem key={index} value={code.id}>
              {code.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Grid>
  );
}
