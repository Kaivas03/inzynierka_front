import { useLocation, useNavigate } from "react-router-dom";

// Hook do używania zamiast history.push - posiada opcję zachowania URLSearchParams
export function useNavigateSok(preserveParams = false) {
  const location = useLocation();
  const navigate = useNavigate();
  return (to: string) => {
    const query = new URLSearchParams(location.search);
    const queryString = preserveParams ? "?" + query.toString() : "";
    navigate(to + queryString);
  };
}
