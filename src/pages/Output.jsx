/* eslint-disable react/prop-types */
import { Button, Typography, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Output = ({ output, loading, setOutput }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user exists; if not, redirect to login
      if (!user) {
        return navigate("/login");
      }
      if (!output) {
        return navigate("/");
      }
    }, 10); // Delay of 1 second

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [user, navigate]);
  console.log(output, user);

  return (
    <div
      style={{
        height: "100vh",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? ( // Show a loader if the data is being fetched
        <CircularProgress />
      ) : (
        <>
          {!output ? (
            <div
              style={{
                margin: "0 auto",
                width: "fit-content",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
              }}
            >
              <Typography variant="h4">
                You have to fill all details to predict your output
              </Typography>
              <Button variant="contained" onClick={() => navigate("/")}>
                Please fill your data here...
              </Button>
            </div>
          ) : (
            <div
              style={{
                margin: "0 auto",
                width: "fit-content",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
              }}
            >
              <Typography variant="h4">Your Result is...</Typography>
              <Typography variant="h5">{output}</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/");
                  setOutput("");
                }}
              >
                Click here to predict again...
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Output;
