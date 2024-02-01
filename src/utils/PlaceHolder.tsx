import { Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface PlaceholderProps {
  children?: ReactNode;
  minHeight?: ReactNode;
  [x: string]: any;
}

export function Placeholder({
  children,
  minHeight = "400px",
  ...rest
}: PlaceholderProps) {
  return (
    <Grid
      container
      sx={{ minHeight: `${minHeight}` }}
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography
          align="center"
          sx={{
            color: (theme) => theme.palette.grey[400],
            textTransform: "uppercase",
          }}
          variant="h4"
        >
          {children}
        </Typography>
      </Grid>
    </Grid>
  );
}
