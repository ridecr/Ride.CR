import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

function SignUpSuccess(props) {
  const { isLoggedIn, signupUserSuccessful } = useSelector(
    (state) => state.user
  );

  if (isLoggedIn) {
    return <Redirect to="/my-rides" />;
  }

  if (!signupUserSuccessful) {
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <Container className="py-5 text-center">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success">Sign up successful!</h1>
            <p className="lead text-white">Welcome to our platform 🎉</p>
          </Col>
        </Row>
        <Row>
          <Col>
            You can now sign in by{" "}
            <Link to="/login" className="text-success">
              clicking here
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUpSuccess;
