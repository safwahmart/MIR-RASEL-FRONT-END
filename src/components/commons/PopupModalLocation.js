import { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import SWButton from "../reuseComponents/SWButton";
import { SWInput } from "../reuseComponents/SWInput";

const PopupModalLocation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Check if the modal has been shown before
    const hasModalBeenShown = localStorage.getItem("hasModalBeenShown");

    if (!hasModalBeenShown) {
      // If not shown before, show the modal
      handleShow();
      // Set a flag in localStorage to indicate that the modal has been shown
      localStorage.setItem("hasModalBeenShown", "true");
    }
  }, []);
  return (
    <>
      <section>
        <Container>
          {/* <Button variant="primary" onClick={handleShow}>
            Pop Up for Address
          </Button> */}

          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            className="sw__popup__modal__address"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <i className="flaticon-placeholder"></i> Select your delivery time &
                location
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" method="post">
                {/* item */}
                <select name="">
                  <option value="">--Select District--</option>
                  <option value="">Dhaka</option>
                </select>
                {/* item */}
                <select name="">
                  <option value="">--Select Area--</option>
                  <option value="">Dhaka</option>
                </select>

                {/* item */}
                <SWInput type="date" name="" />
                {/* item */}
                <select name="">
                  <option value="">--Select Area--</option>
                  <option value="">Dhaka</option>
                </select>

                <SWButton name="Submit" className="bg" />
              </form>
            </Modal.Body>
          </Modal>
        </Container>
      </section>
    </>
  );
};

export default PopupModalLocation;
