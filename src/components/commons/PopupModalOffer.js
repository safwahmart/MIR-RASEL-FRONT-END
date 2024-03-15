import { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import SWImages from "../reuseComponents/SWImages";

const PopupModalOffer = () => {
  const [show, setShow] = useState(true);
  const [popUp, setPopUp] = useState({});

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
	getPopup()
  }, []);
  const getPopup = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getPopup`);
      setPopUp(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }

  return (
    <>
          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            className="sw__popup__modal"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>{popUp?.title}</Modal.Title>
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
    </>
  );
};

export default PopupModalOffer;
