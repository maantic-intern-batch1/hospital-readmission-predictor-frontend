import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Stack
        alignItems={"center"}
        spacing={"2rem"}
        justifyContent={"center"}
        height="100%"
      >
        <MdErrorOutline style={{ fontSize: "10rem" }} />
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">Not Found</Typography>
        <Link to="/">Go back to home</Link>
      </Stack>
    </Container>
  );
};

export default NotFound;
