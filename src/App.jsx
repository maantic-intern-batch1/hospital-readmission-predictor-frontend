import { useEffect, useState } from "react";
import FormLayout from "./pages/FormLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Output from "./pages/Output";
import axios from "axios";
import ProtectRoute from "./component/ProtectRoute";
import Login from "./pages/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth.js";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [output, setOutput] = useState(""); // for the output from db
  const { user } = useSelector((state) => state.auth); // for the current logged in user
  const dispatch = useDispatch();
  const server_url = import.meta.env.VITE_SERVER_URL; // server url

  useEffect(() => {
    // function to fetch data is token exists
    const fetchData = () => {
      axios
        .get(`${server_url}/profile`, { withCredentials: true })
        .then(({ data }) => {
          dispatch(userExists(data));
        })
        .catch(() => {
          dispatch(userNotExists());
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching
        });
    };
    fetchData();
  }, [dispatch]);

  // console.log("Printing output", output);

  return (
    <BrowserRouter>
      <Routes>
        {/* route for home page */}
        <Route
          path="/"
          element={
            <ProtectRoute user={user} redirect={"/login"}>
              {!output ? (
                <FormLayout
                  loading={loading}
                  setLoading={setLoading}
                  setOutput={setOutput}
                />
              ) : (
                <Output output={output} setOutput={setOutput} />
              )}
            </ProtectRoute>
          }
        />
        {/* route for login page */}
        <Route
          path="/login"
          element={
            <ProtectRoute user={!user} redirect={"/"}>
              {!output ? <Login /> : <Output output={output} />}
            </ProtectRoute>
          }
        />
        {/* for extra routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right"/>
    </BrowserRouter>
  );
};

export default App;
