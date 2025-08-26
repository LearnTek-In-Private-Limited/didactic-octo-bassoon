import { Form, Input, Checkbox, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginSuccess } from "../../store/authActions";
import firebase from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

toast.configure();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const history = useHistory();

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(loginSuccess(user));
        toast.success("Login Successful!", { position: "top-right", autoClose: 3000 });
        history.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(loginFailure(errorMessage));
        toast.error(`Login Failed: ${errorMessage}`, { position: "top-right", autoClose: 3000 });
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
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="logo-1" style={{ color: "#02612e " }}>
            Learn TEK In
          </h1>
          <p style={{ color: "black" }}>We construct your path to the digital world!</p>
        </div>

        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin} // Only triggers when form is submitted
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

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: "6rem" }}>
              Login
            </Button>
            <Link to="/register">
              <Button type="default" style={{ width: "6rem" }}>Register</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
