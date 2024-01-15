import { Link } from "react-router-dom";
import {
  Divider,
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentProjectId } from "../projects/projectsSlice";
import HomeIcon from "@mui/icons-material/Home";
import { makeNodePackageEmpty } from "../mind_map/ReactFlow/store";
import { setCurrentHypothesisId } from "../mind_map/hypothesisSlice";

export default function ControlPanel() {
  const dispatch = useAppDispatch();
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);

  return (
    <Drawer variant="permanent" anchor="left" sx={{ minWidth: 20 }}>
      <Paper sx={{ width: "240px", maxWidth: "100%" }}>
        <MenuList>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <MenuItem
              onClick={() => {
                dispatch(setCurrentProjectId(undefined));
                dispatch(makeNodePackageEmpty());
                dispatch(setCurrentHypothesisId(undefined));
              }}
            >
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
