import { Form, Input, Checkbox, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginSuccess } from "../../store/authActions";
import firebase from "../../firebase";  // Make sure your firebase config is correct
import Swal from "sweetalert2"; // Import SweetAlert2
import "./Login.css"; // For additional custom styles if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  // Add loading state
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const history = useHistory();

  useEffect(() => {
    // Check if the user is already logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // If the user is logged in, redirect them to the home page
        dispatch(loginSuccess(user));
        history.push("/");  // Redirect to home page if logged in
      }
    });
  }, [dispatch, history]);

  const handleLogin = () => {
    setLoading(true);  // Start loading
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(loginSuccess(user));
        Swal.fire({
          title: "Success!",
          text: "Login successful. Welcome back!",
          icon: "success",
          confirmButtonText: "OK",
        });
        history.push("/");  // Redirect to home page after successful login
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(loginFailure(errorMessage));
        Swal.fire({
          title: "Error!",
          text: `Login failed: ${errorMessage}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      })
      .finally(() => {
        setLoading(false);  // Stop loading
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5", // Subtle background color for contrast
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px", // Set a maximum width for better usability
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="logo-1" style={{ color: "rgb(6, 113, 31)" }}>
            Learn TEK In
          </h1>
          <h4 style={{ color: "black" }}>We explore the world!</h4>
        </div>

        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px", // Adjust space between buttons
              marginTop: "20px", // Add spacing between the form and buttons
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "6rem", // Make button width responsive
                padding: "0px 0px",
              }}
              onClick={handleLogin}
              loading={loading}  // Show loading state
            >
              Login
            </Button>
            <Link to="/register">
              <Button
                type="default"
                style={{
                  width: "6rem", // Make button width responsive
                  padding: "0px 0px",
                }}
              >
                Register
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
