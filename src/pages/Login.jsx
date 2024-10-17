/* eslint-disable no-unused-vars */
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userExists, userNotExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const server_url = import.meta.env.VITE_SERVER_URL;

  const toggleLogin = () => setIsLogin((prev) => !prev);

  // login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    setIsLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const { data } = await axios.post(`${server_url}/login`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.dismiss(toastId);
      toast.success("Login successful");
      dispatch(userExists(data));
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
      dispatch(userNotExists());
    } finally {
      setIsLoading(false);
    }
  };

  // signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phone", phone);
    setIsLoading(true);

    const toastId = toast.loading("Signing up...");
    try {
      await axios.post(`${server_url}/register`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(userExists({ name, email, phone }));
      toast.dismiss(toastId);
      toast.success("Signup successful");
    } catch (error) {
      // console.log(typeof(error))
      toast.dismiss(toastId);
      if (error.response.data.message) toast.error(error.response.data.message);
      else {
        const obj = error.response.data.errors;
        // // console.log(obj);
        Object.keys(obj).forEach((key) => {
          if (key == "phone") {
            toast.error("Enter a valid phone number");
          } else if (key == "password") {
            toast.error("Password must be at least 6 characters");
          } else {
            toast.error(`${obj[key]}`);
          }
        });
      }
      dispatch(userNotExists());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            // signup form
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                onSubmit={handleSignup}
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Phone No"
                  margin="normal"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
