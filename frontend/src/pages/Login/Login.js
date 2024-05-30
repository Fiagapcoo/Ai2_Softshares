import { Form, Button, Container, Row, Col } from "react-bootstrap";
import SSOButton from "../../components/SSOButton/SSOButton";
import "./Login.css";



const Login = () => {
  const Login = () =>{
    alert("Login");
  };

  return (
    <Container fluid className="login">
      <Row className="justify-content-center mb-4">
        <Col md="auto">
          <div className="softshares-wrapper text-center">
            <h1 className="softshares mt-4">
              <span>Soft</span>
              <span className="shares">Shares</span>
            </h1>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form className="facebook-login">
            <div className="mb-4 text-center">
              <div className="welcome-please-insert mt-4 welcome-text">
                Welcome! Please insert your details:
              </div>
            </div>
            <div className="text-center mb-4">
              <img
                className="person-circle-icon"
                loading="lazy"
                alt=""
                src="/assets/personcircle.svg"
              />
            </div>
            <div className="input-fields mb-4">
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="d-flex justify-content-between mb-3">
                <a
                  className="component-1"
                  role="button"
                  href="/signup"
                >
                  Don’t have an account?
                </a>
                <a className="password-reset" role="button" href="/forgotpassword">
                  Forgot password?
                </a>
              </div>
              <div className="text-center mb-3">
                <Button
                  className="w-100 login-button"
                  variant="primary"
                  onClick={Login}
                >
                  Login
                </Button>
              </div>
              <div className="separator my-4 d-flex align-items-center">
                <div className="flex-grow-1">
                  <hr />
                </div>
                <div className="px-3">OR</div>
                <div className="flex-grow-1">
                  <hr />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <SSOButton
                  text="Continue with Google"
                  icon="/assets/google.svg"
                  className="mb-3 sso-button"
                />
                <SSOButton
                  text="Continue with Facebook"
                  icon="/assets/facebook.svg"
                  className="mb-3 sso-button"
                />  
                <SSOButton
                  text="Continue with Apple"
                  icon="/assets/apple.svg"
                  className="mb-3 sso-button"
                />
              </div>
            </div>
            <div className="text-center mt-3">
              <a href="#" className="privacy-policies">
                Privacy Policies
              </a>
              <span className="mx-2 vertical-bar"></span>
              <a href="#" className="terms-of-service">
                Terms of Service
              </a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
