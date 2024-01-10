import { Route, Routes } from "react-router-dom";
import { Hypothesis } from "./hypothesis/Hypothesis";

export default function App() {
  return (
    <Routes>
      <Route path={`/hypothesis`} element={<Hypothesis />} />
    </Routes>
  );
}
