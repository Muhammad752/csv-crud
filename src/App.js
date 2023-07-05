import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataPage from "./pages/DataPage";
import SignUpPage from "./pages/SignUpPage";
import Protector from "./auth/Protector";
import NotFound from "./pages/NotFound";
import SingUpAlterNate from "./pages/SignUpAlternate";
import useUser from "./auth/useUser";
import CheckIfWorks from "./pages/Check";

function App() {
  /*--------------------
  
  Changing for checking
  
  --------------------*/
  let user = useUser();
  // localStorage.setItem(
  //   "ipoteka_token",
  //   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLQlpqOXEtbk9yOXdPVmhRNXFibWx0NmVJMVp0OWlOa1c3eWhVMVZSN0cwIn0.eyJleHAiOjE2ODg0Nzc0NDUsImlhdCI6MTY4ODQ3Mzg0NSwianRpIjoiYzViZWU1NGEtYzExOS00ZGMwLWJkZDItYjgyYTcxNjU4ZmEwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL3BhcnNlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlNmRhM2ZlNS1lODBlLTRjZTktYWEwNy03NTA3OTg4NTQ0YTkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJwYXJzZXIiLCJzZXNzaW9uX3N0YXRlIjoiNTFjNDIxNWUtYTMzMi00Y2E2LWFhN2YtMWU2NzA3MDllZWJhIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhcnNlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJwYXJzZXIiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjUxYzQyMTVlLWEzMzItNGNhNi1hYTdmLTFlNjcwNzA5ZWViYSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiKzk5ODk5NjA5MzExMCJ9.eHfBphCfemPU0lMVDN15sfmR-_w2e1U5O1o9R59XRiYc8LqqtJxj1KQD7vUeYJZBGj7bjHDIXWzmK-afG8JMhkc8SwcLMjWs0rjcxY1HTwQSC_VtCit0pvNILXxVKmHizpvinShzfh3ZhhqKd6yRqU5sbiPEKrh9ewKwcSrM5fPu_LsT9nDijjThYeM2Ible2GPHD8ISMAjSYIRsO6TPM53TMD5oXJzjVtiTUiE83L-3oT7hjx_s3A5MuP90fd10PWUc6IM4ZGWhvqcg9G8YvF9C8-nuiGbgRzhe95vreZ3KDjxE5BmCzLEHbHXj0czCdvSfqdTSKarfIloWcUsg3w"
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign" element={<SingUpAlterNate />} />
        <Route index element={<Login user={user} />} />
        <Route element={<Protector user={user} />}>
          <Route path="/dataPage" element={<DataPage />} />
        </Route>
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
