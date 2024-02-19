import { FormControl, Grid, MenuItem, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { fetchCodeGroups } from "../code_groups/codeGroupSlice";
import { CodeGroup } from "../code_groups/codeGroupTypes";

type Props = {
  defaultCodeGroupId: number | undefined;
  setSelectedCodeGroupId: (e: number | undefined) => void;
};

export default function CodeGroupSingleSelect(props: Props) {
  const { defaultCodeGroupId = undefined, setSelectedCodeGroupId } = props;
  const dispatch = useAppDispatch();
  const { codeGroupList } = useAppSelector((state) => state.codeGroupsReducer);

  useEffect(() => {
    dispatch(fetchCodeGroups());
    setSelectedCodeGroupId(defaultCodeGroupId);
    // eslint-disable-next-line
  }, []);

  return (
    <Grid item margin={1}>
      <FormControl size="small" sx={{ minWidth: 240 }}>
        <TextField
          select
          variant="standard"
          defaultValue={defaultCodeGroupId}
          onChange={(e) => setSelectedCodeGroupId(parseInt(e.target.value))}
          fullWidth
        >
          <MenuItem value={undefined}>-</MenuItem>
          {codeGroupList?.map((code: CodeGroup, index) => (
            <MenuItem key={index} value={code.id}>
              {code.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Grid>
  );
}
