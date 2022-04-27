import React from "react";
import { Link } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";
import { AlertFillIcon, ChevronRightIcon } from "@primer/octicons-react";

import GoBack from "../components/GoBack";

const Help = () => {
  return (
    <div>
      <GoBack />

      <hr className="my-2" />

      <Container fluid className="p-0" data-aos="fade-in">
        <ListGroup variant="flush">
          <ListGroup.Item className="border-0">
            <p className="mb-0">
              <AlertFillIcon size={24} className="text-warning me-2" />
              If anything happens during your ride, call the local emergency
              services <strong>911</strong> immediatly
            </p>
          </ListGroup.Item>

          <hr className="my-2" />

          <Link to="/coming-soon" className="text-decoration-none">
            <ListGroup.Item className="border-0">
              <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                <p className="mb-0">How does it works?</p>
                <ChevronRightIcon size={24} verticalAlign="middle" />
              </div>
            </ListGroup.Item>
          </Link>

          <Link to="/report" className="text-decoration-none">
            <ListGroup.Item className="border-0">
              <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                <p className="mb-0">Report a problem</p>
                <ChevronRightIcon size={24} verticalAlign="middle" />
              </div>
            </ListGroup.Item>
          </Link>

          <Link to="/coming-soon" className="text-decoration-none">
            <ListGroup.Item className="border-0">
              <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                <p className="mb-0">Refund policy</p>
                <ChevronRightIcon size={24} verticalAlign="middle" />
              </div>
            </ListGroup.Item>
          </Link>

          <Link to="/coming-soon" className="text-decoration-none">
            <ListGroup.Item className="border-0">
              <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                <p className="mb-0">FAQ</p>
                <ChevronRightIcon size={24} verticalAlign="middle" />
              </div>
            </ListGroup.Item>
          </Link>

          <hr className="my-2" />
        </ListGroup>
      </Container>
    </div>
  );
};

export default Help;
