import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataPage from "./pages/DataPage";
import SignUpPage from "./pages/SignUpPage";
import Protector from "./auth/Protector";
import NotFound from "./pages/NotFound";
import SingUpAlterNate from "./pages/SignUpAlternate";
import useUser from "./auth/useUser";
import Users from "./pages/USERS/Users";
import CheckIfWorks from "./pages/Check";

function App() {
  /*--------------------
  
  Changing for alert box
  
  --------------------*/
  // if (document.getElementById) {
  //   window.alert = function (txt) {
  //     console.log(alert);
  //     // document.body.ch
  //     return <p className='te text-red-500'>Warning</p>;
  //   };
  // }
  let user = useUser();
  // localStorage.setItem(
  //   "ipoteka_token",
  //   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLQlpqOXEtbk9yOXdPVmhRNXFibWx0NmVJMVp0OWlOa1c3eWhVMVZSN0cwIn0.eyJleHAiOjE2ODg1NTY2OTAsImlhdCI6MTY4ODU1MzA5MCwianRpIjoiZDU0ZTU4NmMtOGRlMi00NDY3LWFlODktZGIwYTAwODAzOWYyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL3BhcnNlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIwNWExNzg3OC02OTBiLTQwNTktYTMzNC1hNzM4ZWM4MTgyYjAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJwYXJzZXIiLCJzZXNzaW9uX3N0YXRlIjoiNWRlNGEzYzQtYTlhZS00ZTQ0LWFiOTEtZTIyZWFmNzc0NTU5IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhcnNlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJwYXJzZXIiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjVkZTRhM2M0LWE5YWUtNGU0NC1hYjkxLWUyMmVhZjc3NDU1OSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Ik11aGFtbWFkam9uIE1hZGFtaW5vdiIsInByZWZlcnJlZF91c2VybmFtZSI6Iis5OTg5OTc5ODkwMTMiLCJnaXZlbl9uYW1lIjoiTXVoYW1tYWRqb24iLCJmYW1pbHlfbmFtZSI6Ik1hZGFtaW5vdiIsImVtYWlsIjoibWFkYW1pbm92Lm11aGFtbWFkam9uQG1haWwucnUifQ.FJZLsNybJQyEKY56AHcem9sU4r6a7IjIDi3bUC3VKeLAtbjVk2nGNpFDs0wf1aKkEn1_9Eb8DlNfvy56JqN-huzb0b8Wl2X8C8CU2fCDKwjpNPQrIgsjNKwvZU5tdPA5xJDr_syQSW4xbCrBminEYFuGVA_f6GKrCItbkkBAdXC69LvTI7sT9UFGbwrd0dEnhTsR6PtjorbHyf9Etjk5TGlcEdgpkZx5co4aYCcup_JoFrUSYGurYW21Zg9cLHGxrw9ci_Un4bNxEGWxT0nxHhnbaQZMro5DAO81soMTuxMpLG0xMKNGUJeoXnTytKW1s-rHJ5I1-SonMQ7VIZqFTw"
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Login user={user} />}
        />
        <Route
          path='sign'
          element={<SingUpAlterNate />}
        />
        <Route element={<Protector user={user} />}>
          <Route
            path='/dataPage'
            element={<DataPage />}
          />  
        <Route
          path='/users'
          element={<Users user={user} />}
        />
        </Route>
        <Route
          path='/signUp'
          element={<SignUpPage />}
        />
        <Route
          path='/users'
          element={<Users user={user} />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
