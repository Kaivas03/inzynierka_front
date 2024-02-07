import {
  Chip,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  TextFieldVariants,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { fetchCodeList } from "../codes/codeSlice";
import { CodeGroup } from "../code_groups/codeGroupTypes";

type Props = {
  setSelectedCodeGroups: (e: CodeGroup[]) => void;
  textFieldVariant: TextFieldVariants | undefined;
  initialCodeGroups: CodeGroup[];
  codeGroups: CodeGroup[];
  error: boolean;
  helperText: string;
};

export default function CodeGroupMultiSelect(props: Props) {
  const dispatch = useAppDispatch();
  const {
    setSelectedCodeGroups: setSelectedCodes,
    textFieldVariant = "outlined",
    initialCodeGroups: initialCodes = [],
    codeGroups: codes = [],
    error = false,
    helperText,
  } = props;

  useEffect(() => {
    dispatch(fetchCodeList());
    setSelectedCodes(initialCodes);
    // eslint-disable-next-line
  }, []);

  const getRenderTags = (renderCodeGroups: CodeGroup[], getTagProps: any) =>
    renderCodeGroups.map((code, index) => (
      <Chip
        {...getTagProps({ index })}
        sx={{ margin: "0.2rem" }}
        key={`multi_${code.id}`}
        size="small"
        label={`${code.name}`}
        variant="outlined"
      />
    ));

  const getRenderOption = (renderProps: any, option: CodeGroup) => (
    <Grid container direction="row" alignItems="center" {...renderProps}>
      <Grid item>
        <Typography>{option.name}</Typography>
      </Grid>
    </Grid>
  );

  return (
    codes && (
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={codes}
        getOptionLabel={(option) => `${option.name}`}
        multiple
        openText="Pokaż opcje"
        closeText="Schowaj opcje"
        noOptionsText="Brak opcji"
        loadingText="Ładowanie opcji..."
        clearText="Wyczyść"
        limitTags={5}
        disableClearable
        defaultValue={initialCodes}
        getLimitTagsText={(more) => `+ ${more} więcej`}
        disableCloseOnSelect
        filterSelectedOptions
        size="small"
        onChange={(e, values) => {
          setSelectedCodes(values);
        }}
        renderOption={(renderProps, option) =>
          getRenderOption(renderProps, option)
        }
        renderTags={(renderCodes, getTagProps) =>
          getRenderTags(renderCodes, getTagProps)
        }
        renderInput={(params) => (
          <TextField
            margin="dense"
            error={error}
            helperText={helperText}
            variant={textFieldVariant}
            maxRows="1"
            {...params}
          />
        )}
      />
    )
  );
}
