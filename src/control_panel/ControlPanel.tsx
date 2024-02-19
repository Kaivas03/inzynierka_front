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
import { useNavigateSok } from "../utils/hooks";

export default function ControlPanel() {
  const dispatch = useAppDispatch();
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const navigate = useNavigateSok();

  return (
    <Drawer variant="permanent" anchor="left" sx={{ minWidth: 20 }}>
      <Paper sx={{ width: "240px", maxWidth: "100%" }}>
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate(`/`);
              dispatch(setCurrentProjectId(undefined));
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Badania</ListItemText>
          </MenuItem>
        </MenuList>
        {currentProjectId && (
          <MenuList>
            <Divider />
            <MenuItem
              onClick={() => navigate(`/${currentProjectId}/interview`)}
            >
              Teksty
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate(`/${currentProjectId}/codes`)}>
              Kody
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => navigate(`/${currentProjectId}/code-groups`)}
            >
              Grupy kodów
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate(`/${currentProjectId}/mind-map`)}>
              Wnioski
            </MenuItem>
          </MenuList>
        )}
      </Paper>
    </Drawer>
  );
}
