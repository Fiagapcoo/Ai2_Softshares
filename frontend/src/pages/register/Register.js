import React from "react";
import "./Register.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "http://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log(res);
      } catch (err) {
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
            <div className="mt-auto borda">
              <div className="d-flex justify-content-center">
                <h1 className="bold">Sign Up</h1>
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
                  <p className="black SSO mb-0">Sign in with Google</p>
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
                  <p className="black SSO mb-0">Sign in with Facebook</p>
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
                  <p className="black SSO mb-0">Sign in with Apple</p>
                </button>
              </div>
              <div className="or-container">
                <div className="or-line"></div>
                <span className="or-text">OR</span>
                <div className="or-line"></div>
              </div>

              <div className="d-flex flex-column justify-content-center">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <div className="input-group mb-3">
                  <input
                    type="pasword"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center gap-2">
                <a className="link" href="/login">
                  Alredy have an account?
                </a>
              </div>

              <div className="terms-container">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  value="terms"
                  className="terms-checkbox"
                />
                <p className="mb-0">I agree with the terms of service</p>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="login btn btn-primary btn-lg d-flex justify-content-center align-items-center"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
