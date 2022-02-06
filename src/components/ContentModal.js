import { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";

function ContentModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState({ user: {}, src: "", avatar: "" });
  const pretieData = (ctx) => {
    handleShow(true);
    setUser({
      id: ctx.user,
      src: ctx.src,
      avatar: `https://picsum.photos/1024/1024?random=${ctx.user}`,
      user: {
        id: ctx.user.id,
        name: ctx.user.name,
        username: ctx.user.username,
        email: ctx.user.email,
        avatar: ctx.user.avatar,
        address: {
          street: ctx.user.address.street,
          city: ctx.user.address.city,
        },
        website: ctx.user.website,
        company: {
          name: ctx.user.company.name,
          catchPhrase: ctx.user.company.catchPhrase,
          bs: ctx.user.company.bs,
        },
      },
    });
    console.log(ctx);
  };
  useEffect(() => {
    window.addEventListener("show-modal", ({ detail }) => pretieData(detail));
  }, []);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="w-100"
      dialogClassName="w-100"
      size="xl"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="w-100">
        <Container className="container-lg">
          <Row>
            <Col className="col-6">
              <img src={user.src} width={"100%"} />
            </Col>
            <Col className="col-6">
              <Row className="align-items-center">
                <Col className="col-2 py-3">
                  <img
                    className="rounded-circle"
                    width="100%"
                    src={user.user.avatar}
                  />
                </Col>
                <Col className="col-10">
                  <span>{user.user.name}</span>
                </Col>
                <hr></hr>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
export default ContentModal;
