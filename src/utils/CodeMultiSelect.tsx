import {
  Chip,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  TextFieldVariants,
} from "@mui/material";
import { useEffect } from "react";
import { Code } from "../codes/codeTypes";
import { useAppDispatch } from "../store";
import { fetchCodeList } from "../codes/codeSlice";

type Props = {
  setSelectedCodes: (e: Code[]) => void;
  textFieldVariant: TextFieldVariants | undefined;
  initialCodes: Code[];
  codes: Code[];
  error: boolean;
  helperText: string;
};

export default function CodeMultiSelect(props: Props) {
  const dispatch = useAppDispatch();
  const {
    setSelectedCodes,
    textFieldVariant = "outlined",
    initialCodes = [],
    codes = [],
    error = false,
    helperText,
  } = props;

  useEffect(() => {
    dispatch(fetchCodeList());
    setSelectedCodes(initialCodes);
    // eslint-disable-next-line
  }, []);

  const getRenderTags = (renderCodes: Code[], getTagProps: any) =>
    renderCodes.map((code, index) => (
      <Chip
        {...getTagProps({ index })}
        sx={{ margin: "0.2rem" }}
        key={`multi_${code.id}`}
        size="small"
        label={`${code.name}`}
        variant="outlined"
      />
    ));

  const getRenderOption = (renderProps: any, option: Code) => (
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
