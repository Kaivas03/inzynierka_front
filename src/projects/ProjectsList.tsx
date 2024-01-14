import { Container, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { fetchProjects } from "./projectsSlice";
import { Project } from "./projectsTypes";
import ProjectListItem from "./ProjectListItem";

export function ProjectsList() {
  const dispatch = useAppDispatch();
  const { projectsList } = useAppSelector((state) => state.projectsReducer);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Grid container spacing={1} sx={{ marginTop: "1rem" }}>
        {projectsList.map((project: Project) => (
          <Grid item xs={6} sm={4} md={3}>
            <ProjectListItem id={project.id} name={project.name} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
