import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Drawer,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentProjectId } from "../projects/projectsSlice";
import HomeIcon from "@mui/icons-material/Home";

export default function ControlPanel() {
  const dispatch = useAppDispatch();
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);

  return (
    <Drawer variant="permanent" anchor="left" sx={{ minWidth: 20 }}>
      <Paper sx={{ width: "240px", maxWidth: "100%" }}>
        <MenuList>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <MenuItem onClick={() => dispatch(setCurrentProjectId(undefined))}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Badania</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
        {currentProjectId && (
          <MenuList>
            <Divider />
            <Link
              to={"/interview"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>Wywiady</MenuItem>
            </Link>
            <Divider />
            <Link
              to={"/codes"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>Kody</MenuItem>
            </Link>
            <Divider />
            <Link
              to={"/code-groups"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>Grupy kodów</MenuItem>
            </Link>
            <Divider />
            <Link
              to={"/mind-map"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>Hipotezy</MenuItem>
            </Link>
          </MenuList>
        )}
      </Paper>
    </Drawer>
  );
}
