import React from "react";
import "./Login.css";
import {useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";



 const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const teste = async () => {
    setPassword("");
    alert("Login: username: " + username + " password: " + password);

    if(username === "admin" && password === "admin"){
      alert("Login efetuado com sucesso!");
    }
  }


  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try{
        const res = await axios.get(
          "http://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log(res);
      }catch(err){
        console.log(err);
      }
    },
  });

  return (
    <div className="container text-center">
      <div className="row align-items-start">
        <div className="col">
          <div className="title d-flex flex-column">
            <div className="mb-auto">
              <p className="soft-shares">
                <span className="blue">Soft</span>
                <span className="black">Shares</span>
              </p>
            </div>
            <p className="welcome-please">
              Welcome!&nbsp;&nbsp;Please insert your details:
            </p>
            <div className="d-flex justify-content-center">
              <img
                className="person-circle"
                alt="person-circle"
                src="assets/vectors/person-circle.svg"
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg short-input"
                  placeholder="Username"
                  aria-label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
              </div>
            </div>
            <div className="d-flex justify-content-center gap-2">
              <a className="link" href="/register">
                Don't have an account?
              </a>
              <a className="link" href="/#">
                Forgot password?
              </a>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="login btn btn-primary btn-lg d-flex justify-content-center align-items-center"
                onClick={teste}
              >
                Login
              </button>
            </div>
            <div className="or-container">
              <div className="or-line"></div>
              <span className="or-text">OR</span>
              <div className="or-line"></div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="SSOLogin btn btn-primary btn-lg d-flex align-items-center"
                onClick={() => login()}
              >
                <img
                  src="assets/images/1.png"
                  alt="Google Logo"
                  className="mr-2"
                />
                <p className="black SSO mb-0">Continue with Google</p>
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="SSOLogin btn btn-primary btn-lg d-flex align-items-center"
              >
                <img
                  src="assets/images/2.png"
                  alt="Facebook Logo"
                  className="mr-2"
                />
                <p className="black SSO mb-0">Continue with Facebook</p>
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="SSOLogin btn btn-primary btn-lg d-flex align-items-center"
              >
                <img
                  src="assets/images/3.png"
                  alt="Google Logo"
                  className="mr-2"
                />
                <p className="black SSO mb-0">Continue with Apple</p>
              </button>
            </div>
            <div className="policy-terms d-flex justify-content-center">
              <ul className="d-flex align-items-center mb-0">
                <li className="mr-3 black mb-0">Privacy Policies</li>
                <li className="vertical-blue-bar mx-3"></li>
                <li className="black mb-0">Terms of service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;