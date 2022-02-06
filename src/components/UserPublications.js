import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Api from "../api";
import ContentCard from "./ContentCard";

function UserPublish(props) {
  const [publishQuantity, setPublishQuantity] = useState(0);
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    Api.GetUserById(props.id).then(({ data }) => {
      setPublishQuantity(data.name.length);
      setUserInfo(data)
    });
  }, [props.id]);
  return (
    <Row>
      {[...Array(publishQuantity)].map((e, i) => {
        return (
          <Col key={i} className="col-4 px-0 m-0 p-sm-1 p-lg-2 p-xl-3">
            <ContentCard
              src={"https://picsum.photos/1024/1024?random=" + i}
              ratio={"1x1"}
              user={userInfo}
              avatar = {props.avatar}
            />
          </Col>
        );
      })}
    </Row>
  );
}
export default UserPublish;
