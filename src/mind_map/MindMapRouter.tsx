import { Route, Routes, useResolvedPath } from "react-router-dom";
import { Placeholder } from "../utils/PlaceHolder";
import { MindMap } from "./ReactFlow/MindMap";

export default function MindMapRouter() {
  let path = useResolvedPath("").pathname;

  return (
    <Routes>
      <Route path={`${path}/:hypothesisId`} element={<MindMap />} />
      <Route
        path={`${path}`}
        element={
          <Placeholder>
            Wybierz hipotezę <br />
            lub utwórz nową
          </Placeholder>
        }
      />
    </Routes>
  );
}
