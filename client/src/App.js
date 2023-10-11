import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Protected from "./components/Protected";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Chat from "./components/Chat";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
