import { Route, Routes } from "react-router-dom";
import { Hypothesis } from "./hypothesis/Hypothesis.tsx";

export default function App() {
  return (
    <Routes>
      <Route path={`/hypothesis`}>
        <Hypothesis />
      </Route>
    </Routes>
  );
}
