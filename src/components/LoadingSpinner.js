import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingSpinner(props) {
  const { size } = props;

  return (
    <Spinner
      animation="border"
      role="status"
      as="span"
      aria-hidden="true"
      className="align-middle me-2"
      size={size}
    />
  );
}

export default LoadingSpinner;
