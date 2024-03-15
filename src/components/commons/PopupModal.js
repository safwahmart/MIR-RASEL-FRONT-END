import React, { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import SWImages from "../reuseComponents/SWImages";

const PopupModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <section>
        <Container>
          <Button variant="primary" onClick={handleShow}>
            Demo Popup
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            className="sw__popup__modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Offer Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="sw__popup__modal__img">
                <SWImages
                  alt="popup-img"
                  height="300"
                  width="300"
                  image="/images/modal-img.png"
                />
              </div>
            </Modal.Body>
          </Modal>
        </Container>
      </section>
    </>
  );
};

export default PopupModal;
