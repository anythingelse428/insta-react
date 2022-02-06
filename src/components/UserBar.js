import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import UserCheckOut from "./UserCheckOut";
import UserPublish from "./UserPublications";
import UserReels from "./UserReels";
import UserVideos from "./UserVideos";

function UserBar(props) {
  const [selectedBar, setSelectedBar] = useState("posts");
  return (
    <Row>
      <Col className="col-12 col-lg-6 offset-lg-3 my-2">
        <Row className="border-top">
          <Col
            onClick={() => setSelectedBar("posts")}
            className={
              "text-center py-3" +
              (selectedBar === "posts" ? " border-top border-dark" : "")
            }
          >
            Публикации
          </Col>
          <Col
            onClick={() => setSelectedBar("reels")}
            className={
              "text-center py-3" +
              (selectedBar === "reels" ? " border-top border-dark" : "")
            }
          >
            Reels
          </Col>
          <Col
            onClick={() => setSelectedBar("videos")}
            className={
              "text-center py-3" +
              (selectedBar === "videos" ? " border-top border-dark" : "")
            }
          >
            Видео
          </Col>
          <Col
            onClick={() => setSelectedBar("check-out")}
            className={
              "text-center py-3" +
              (selectedBar === "check-out" ? " border-top border-dark" : "")
            }
          >
            Отметки
          </Col>
        </Row>
      </Col>
      {selectedBar === "posts" && (
        <Col className="col-12">
          <UserPublish id={props.id} avatar={props.avatar}/>
        </Col>
      )}
      {selectedBar === "reels" && (
        <Col className="col-12">
          <UserReels id={props.id} avatar={props.avatar}/>
        </Col>
      )}
      {selectedBar === "videos" && (
        <Col className="col-12">
          <UserVideos id={props.id} avatar={props.avatar}/>
        </Col>
      )}
      {selectedBar === "check-out" && (
        <Col className="col-12">
          <UserCheckOut id={props.id} avatar={props.avatar}/>
        </Col>
      )}
    </Row>
  );
}

export default UserBar;
