import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Output = ({ output }) => {
  const navigate = useNavigate();
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
      {!output && (
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
      )}
      {output && (
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
          <Button variant="contained" onClick={() => navigate("/")}>
            Click here to predict again...
          </Button>
        </div>
      )}
    </div>
  );
};

export default Output;
