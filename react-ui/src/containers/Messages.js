import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";
import LoadingMessage from "../components/LoadingMessage";

import { getDriverNewRidesRequests } from "../redux";

const Messages = () => {
  // const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverNewRidesRequests, driverNewRidesRequestsData } =
    useSelector((state) => state.message);

  useEffect(() => {
    getDriverNewRidesRequests(currentUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in" data-aos-duration="1000">
      <ListGroup variant="flush">
        <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
          <div className="d-inline-flex justify-content-between w-100 py-3">
            <span>
              {driverNewRidesRequestsData.count > 0 ? (
                <>
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-warning me-3"
                  />{" "}
                  <span>
                    New notifications
                    <Badge bg="danger" className="ms-2">
                      {driverNewRidesRequestsData.count}
                    </Badge>
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-warning me-3"
                  />{" "}
                  <span>
                    No new notifications
                    <Badge bg="danger" className="ms-2">
                      0
                    </Badge>
                  </span>
                </>
              )}
            </span>
          </div>
        </ListGroup.Item>
      </ListGroup>

      {/* Display past booking for this ride by this user */}
      {isLoadingDriverNewRidesRequests ? (
        <Container className="my-5">
          <Row>
            <Col className="text-center">
              <LoadingMessage />
            </Col>
          </Row>
        </Container>
      ) : driverNewRidesRequestsData.count > 0 ? (
        <ListGroup variant="flush">
          <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>New bookings for your ride(s)</span>
            </div>
          </ListGroup.Item>

          {driverNewRidesRequestsData.rows.map((booking, index) => (
            <Link
              to={`/booking/${booking.id}`}
              className="text-light text-decoration-none"
              key={index}
            >
              <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 py-3">
                <small className="text-secondary me-1">
                  {dateFormat(booking.createdAt, "dd/mm HH:MM")}
                </small>{" "}
                Ride:{" "}
                <span className="text-success">{booking.Ride.cityOrigin}</span>{" "}
                to{" "}
                <span className="text-success">
                  {booking.Ride.cityDestination}
                </span>{" "}
                ({dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")}) - Seats
                booked:{" "}
                <span className="text-success">{booking.seatsBooked}</span> /{" "}
                {booking.Ride.seatsAvailable}{" "}
                <span>
                  by{" "}
                  <span className="text-success">{booking.User.username}</span>
                </span>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      ) : null}
    </div>
  );
};

export default Messages;
