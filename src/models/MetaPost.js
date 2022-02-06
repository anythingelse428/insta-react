import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ContentCard from "../components/ContentCard";
function MetaPost(props) {
  const [isHeartFill, setIsHeartFill] = useState(null);
  return (
    <Col xxl={7} className="my-3">
      <Card 
        className="mainMetaPost "
        style={{
          width: "100%",
        }}
      >
        <Card.Header as="h5" className="align-items-center">
          <img
            src={props.avatar}
            width={"5%"}
            className="rounded-circle"
            alt={props.userName}
          />
          <Link to={`/user/${props.id}`} className="userLink">
            <span className="ms-3 fs-6 mb-0">{props.userName + props.isLoaded}</span>
          </Link>
        </Card.Header>
        <ContentCard ratio={"4x3"} src={props.Img} className="metaPostBg" />
        <Row className="align-items-center">
          <Col className="col-4">
            <i
              onMouseEnter={() => setIsHeartFill(true)}
              onMouseLeave={() => setIsHeartFill(false)}
              className={
                `bi me-2 iconSize likePost ` +
                (isHeartFill ? "bi-heart-fill text-danger" : "bi-heart")
              }
            ></i>
            <i className="bi bi-chat-dots me-2 iconSize"></i>
            <i className="bi bi-send me-2 iconSize"></i>
          </Col>
        </Row>
        <Card.Text> {props.Text} </Card.Text>
      </Card>
    </Col>
  );
}
export default MetaPost;
