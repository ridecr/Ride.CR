import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageEmpty from "../../components/MessageEmpty";

import { getDriverBookings } from "../../redux";
import { DotFillIcon } from "@primer/octicons-react";
import { ChevronRight } from "react-bootstrap-icons";
import { isDateInPast } from "../../helpers";

const DriverPastBookings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverBookings, driverBookingsData } = useSelector(
    (state) => state.ride
  );
  const { bookingStatusVariant, rideStatusVariant } = useSelector(
    (state) => state.global
  );

  useEffect(() => {
    if (isLoggedIn || driverBookingsData.length === 0) {
      dispatch(getDriverBookings(currentUser.Driver.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-5">
        <Row className="justify-content-center text-center mb-3">
          <Col>
            <h1 className="title mb-0">
              {t("translation:global.pastBookings")}
            </h1>
          </Col>
        </Row>

        {isLoadingDriverBookings ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : driverBookingsData.length > 0 ? (
          driverBookingsData.map((booking, index) =>
            isDateInPast(booking.Ride.dateTimeOrigin, new Date()) &&
            booking.BookingStatus.id > 2 ? (
              <Row key={index} className="mb-2 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="border shadow-sm rounded mx-auto px-0 mb-2"
                >
                  <Container className="mt-1 px-0">
                    <Link
                      to={`/booking/${booking.id}`}
                      className="text-decoration-none link-dark"
                    >
                      <Row className="align-items-center mx-0">
                        <Col className="ms-2">
                          <small className="text-secondary">
                            {dateFormat(booking.createdAt, "dd/mm/yyyy")}
                          </small>
                          <p className="mb-1">
                            <Trans i18nKey="translation:ridesBookings.summary">
                              <strong>
                                {{ firstName: booking.User.firstName }}
                              </strong>
                              booked
                              <strong>
                                {{ seatsBooked: booking.seatsBooked }}
                              </strong>{" "}
                              seat(s) from{" "}
                              <strong>
                                {{ cityOrigin: booking.Ride.origin.city }}
                              </strong>{" "}
                              to{" "}
                              <strong>
                                {{
                                  cityDestination:
                                    booking.Ride.destination.city,
                                }}
                              </strong>
                            </Trans>
                          </p>
                        </Col>
                        <Col xs={2} className="text-center rounded">
                          <ChevronRight />
                        </Col>
                      </Row>
                    </Link>

                    <Row className="justify-content-center border border-bottom-0 border-start-0 border-end-0 mx-0">
                      <Col className="ms-2">
                        <small className="text-secondary mb-0">
                          {t("translation:global.booking")}:
                        </small>
                        <small
                          className={`text-${bookingStatusVariant(
                            booking.BookingStatusId
                          )}`}
                        >
                          <DotFillIcon size="16" verticalAlign="middle" />
                          {booking.BookingStatus.name}
                        </small>
                      </Col>
                      <Col>
                        <Link
                          to={`/ride/${booking.RideId}`}
                          className="text-decoration-none text-black me-3"
                        >
                          <>
                            <small className="text-secondary mb-0">
                              {t("translation:global.ride")}:
                            </small>
                            <small
                              className={`text-${rideStatusVariant(
                                booking.Ride.RideStatusId
                              )}`}
                            >
                              <DotFillIcon size="16" verticalAlign="middle" />
                              {booking.Ride.RideStatus.name}
                            </small>{" "}
                          </>
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            ) : null
          )
        ) : (
          <Row>
            <Col className="text-center">
              <MessageEmpty title="bookings" />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default DriverPastBookings;
