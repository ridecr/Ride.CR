import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, ListGroup, Modal, Row } from "react-bootstrap";
import {
  CheckCircleFillIcon,
  ChevronRightIcon,
  StarFillIcon,
  XCircleFillIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { logout } from "../../redux";

import GoBack from "../../components/GoBack";
import { PencilSquare } from "react-bootstrap-icons";

function Account() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { srcAvatar } = useSelector((state) => state.global);

  const [showModalRemoveAccount, setShowModalRemoveAccount] = useState(false);
  const [showModalRequestData, setShowModalRequestData] = useState(false);
  const [showModalLogOut, setShowModalLogOut] = useState(false);

  const logOut = () => {
    history.push("/");
    dispatch(logout());
    window.location.reload(true);
  };

  const handleRemoveAccount = () => {
    setShowModalRemoveAccount(false);
    console.log("remove account");
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-2">
        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1 border-0">
              <div>
                <h3 className="mb-0">{currentUser.firstName}</h3>
              </div>
              <img
                src={srcAvatar(currentUser)}
                alt="Avatar"
                className="img-fluid rounded-round img-avatar me-3"
                style={{ width: "75px" }}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="p-3">
              <Row className="align-items-center mb-3">
                <Col>
                  <p className="text-secondary mb-0">
                    {t("translation:global.firstName")}
                  </p>
                  <p className="mb-0">{currentUser.firstName}</p>
                </Col>
              </Row>
              <Row className="align-items-center mb-3">
                <Col>
                  <p className="text-secondary mb-0">
                    {t("translation:global.lastName")}
                  </p>
                  <p className="mb-0">{currentUser.lastName}</p>
                </Col>
              </Row>
              <Row className="align-items-center mb-3">
                <Col>
                  <p className="text-secondary mb-0">
                    {t("translation:global.username")}
                  </p>
                  <p className="mb-0">{currentUser.username}</p>
                </Col>
              </Row>

              <Row className="align-items-center mb-3">
                <Col className="pe-0">
                  <p className="text-secondary mb-0">
                    {t("translation:global.email")}
                  </p>
                  <p className="mb-0">{currentUser.email}</p>
                </Col>
              </Row>

              <Row className="align-items-center mb-3">
                <Col>
                  <p className="text-secondary mb-0">
                    {t("translation:global.phone")}
                  </p>
                  <p className="mb-0">
                    {formatPhoneNumberIntl(currentUser.phoneNumber)}
                  </p>
                  {currentUser.phoneConfirmed ? (
                    <p className="small text-secondary mb-0">
                      <CheckCircleFillIcon
                        size={24}
                        className="text-success me-2"
                      />
                      {t("translation:global.verified")}
                    </p>
                  ) : (
                    <p className="small text-secondary mb-0">
                      <XCircleFillIcon
                        verticalAlign="middle"
                        className="text-warning me-2"
                      />
                      {t("translation:global.notVerified")}
                    </p>
                  )}
                </Col>
              </Row>

              <Row className="align-items-center mb-3">
                <Col xs={11}>
                  <p className="text-secondary mb-0">
                    {t("translation:global.bio")}
                  </p>
                  {currentUser.biography && currentUser.biography !== "" ? (
                    <p className="mb-0">{currentUser.biography}</p>
                  ) : (
                    <p className="mb-0">-</p>
                  )}
                </Col>
                <Col xs={1} className="ps-0">
                  <Link to="/edit/bio" className="cursor-pointer">
                    <PencilSquare size={20} className="text-primary" />
                  </Link>
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col>
                  <p className="text-secondary mb-0">
                    {t("translation:global.memberSince")}
                  </p>
                  <p className="mb-0">
                    {dateFormat(currentUser.createdAt, "dd/mm/yyyy")}
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="p-3">
              <Row>
                <Col>
                  <p className="fw-bold">
                    {t("translation:global.yourRating")}
                  </p>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={6}>
                  {currentUser.Rating.passengerRating > 0 ? (
                    <div className="d-inline-flex align-items-center">
                      <StarFillIcon size={26} className="text-warning me-2" />
                      <h1 className="fw-bold mb-0">
                        {currentUser.Rating.passengerRating}{" "}
                      </h1>
                    </div>
                  ) : (
                    <span>{t("translation:global.noRatings")}</span>
                  )}
                </Col>
                <Col xs={6} className="text-end">
                  <LinkContainer to="/profile/passenger/ratings">
                    <Button variant="success" size={"lg"}>
                      {t("translation:global.view")}
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
            <ListGroup variant="flush">
              <LinkContainer to="/edit/password" className="cursor-pointer">
                <ListGroup.Item className="border-0 cursor-pointer">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">
                      {t("translation:edit.password.title")}
                    </p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </LinkContainer>

              <ListGroup.Item
                className="border-0 cursor-pointer"
                onClick={() => setShowModalRequestData(true)}
              >
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">
                    {t("translation:passengerProfile.requestData")}
                  </p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>

              <ListGroup.Item
                className="border-0 cursor-pointer"
                onClick={() => setShowModalLogOut(true)}
              >
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:global.logOut")}</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>

              <hr />

              <ListGroup.Item
                className="border-0 cursor-pointer"
                onClick={() => setShowModalRemoveAccount(true)}
              >
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="small text-secondary mb-0">
                    {t("translation:passengerProfile.removeAccount")}
                  </p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showModalRequestData}
        onHide={() => setShowModalRequestData(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            {t("translation:passengerProfile.requestData")}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="mb-0">
            {t("translation:passengerProfile.contactRequestData")}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModalRequestData(false)}
          >
            {t("translation:global.close")}
          </Button>
          <LinkContainer to="/contact">
            <Button variant="primary">{t("translation:global.contact")}</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalLogOut}
        onHide={() => setShowModalLogOut(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            {t("translation:global.logOut")}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="mb-0">{t("translation:account.confirmLogOut")}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModalLogOut(false)}>
            {t("translation:global.no")}
          </Button>
          <Button variant="secondary" onClick={logOut}>
            {t("translation:global.yes")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalRequestData}
        onHide={() => setShowModalRequestData(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            {t("translation:passengerProfile.requestData")}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="mb-0">
            {t("translation:passengerProfile.contactRequestData")}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModalRequestData(false)}
          >
            {t("translation:global.close")}
          </Button>
          <LinkContainer to="/contact">
            <Button variant="primary" className="text-white">
              {t("translation:global.contact")}
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalRemoveAccount}
        onHide={() => setShowModalRemoveAccount(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            {t("translation:passengerProfile.removeAccount")}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{t("translation:account.confirmRemoveAccount1")}</p>
          <p className="mb-0">
            {t("translation:account.confirmRemoveAccount2")}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleRemoveAccount}>
            {t("translation:confirmRide.confirm")}
          </Button>
          <Button
            variant="success"
            onClick={() => setShowModalRemoveAccount(false)}
          >
            {t("translation:global.no")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Account;
