import { Card, Col,  Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function MetaPostPlaceholder() {

  return (
    <Col xxl={7} className="my-3 placeholder-glow">
      <Card
        className="mainMetaPost"
        style={{
          width: "100%",
        }}
      >
        <Card.Header as="h5" className="align-items-center placeholder">
          <img
            src=""
            width={"5%"}
            className="rounded-circle placeholder"
            alt=""
          />
          <Link to={`/user/`} className="userLink">
            <span className="ms-3 fs-6 mb-0">asdsad</span>
          </Link>
        </Card.Header>
       <div className="placeholder ratio ratio-4x3"></div>
        <Row className="align-items-center ">
          <Col className="col-4">
            <i
              className="bi me-2 iconSize likePost"
            ></i>
            <i className="bi bi-chat-dots me-2 iconSize"></i>
            <i className="bi bi-send me-2 iconSize"></i>
          </Col>
        </Row>
        <Card.Text className="placeholder"></Card.Text>
      </Card>
    </Col>
  );
}
export default MetaPostPlaceholder;
