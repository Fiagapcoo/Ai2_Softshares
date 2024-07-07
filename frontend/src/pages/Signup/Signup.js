import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import React,{ useState,useEffect } from "react";
import SSOButton from "../../components/SSOButton/SSOButton";
import "./SignUp.css";
import Authentication from '../../Auth.service';


const SignUp = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUser = async () => {
      const token = await Authentication.getCurrentUser(navigate);
      if (token) {
        navigate('/homepage');
      }
    };
    document.title = "SoftShares - SignUp";

    checkCurrentUser();
  }, []);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1] || '';
    
    // Store the user data in local storage
    localStorage.setItem('user', JSON.stringify({ email, firstName, lastName }));
    
    navigate('/selectcity');
  };

  return (
    <div className="signup">
      <div className="softshares-container">
        <h1 className="softshares1">
          <span className="softshares-txt">
            <span>Soft</span>
            <span className="shares1">Shares</span>
          </span>
        </h1>
      </div>
      <div className="rectangle-parent">
        <div className="sign-up-wrapper">
          <h1 className="sign-up">Sign Up</h1>
        </div>
        <div className="frame-wrapper">
          <div className="frame-group">
            <SSOButton
              text="Sign in with Google"
              icon="/assets/google.svg"
              className="mb-3 sso-button"
            />
            <SSOButton
              text="Sign in with Facebook"
              icon="/assets/facebook.svg"
              className="mb-3 sso-button"
            />
            <SSOButton
              text="Sign in with Apple"
              icon="/assets/apple.svg"
              className="mb-3 sso-button"
            />
          </div>
        </div>
        <div className="frame-container">
          <div className="frame-div">
            <div className="frame-parent1">
              <div className="frame-parent2">
                <div className="rectangle-frame">
                  <div className="frame-child4" />
                </div>
                <div className="or1">OR</div>
                <div className="rectangle-wrapper1">
                  <div className="frame-child5" />
                </div>
              </div>
              <Form className="input2" onSubmit={handleSubmit}>
                <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </Form>
            </div>
          </div>
          <Form className="parent">
            <Form.Control
            type="text"
            placeholder="FirstName LastName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </Form>
          <div className="component-3-wrapper">
            <a className="component-3" href="/login">Already have an account?</a>
          </div>
          <div className="frame-wrapper1">
            <div className="frame-parent3">
              <div className="rectangle-wrapper2">
                <Form.Check className="rectangle-formcheck" label="" />
              </div>
              <div className="i-agree-with">I agree with the terms of service</div>
            </div>
          </div>
          <div className="frame-wrapper2">
            <div className="frame-parent4">
              <div className="rectangle-wrapper3">
                <Form.Check className="rectangle-formcheck1" label="" />
              </div>
              <div className="i-agree-with1">I agree with the privacy policy</div>
            </div>
          </div>
          <div className="frame-wrapper3">
            <div className="rectangle-group">
              <Button
                className="w-100 login-button"
                variant="primary"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
