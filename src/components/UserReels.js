import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Api from "../api";
import ContentCard from "./ContentCard";

function UserReels(props) {
  const [reelsQuantity, setReelsQuantity] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    Api.GetUserById(props.id).then(({ data }) => {
      setReelsQuantity(data.name.length);
      setUserInfo(data);
    });
  }, [props]);
  console.log(reelsQuantity);
  return (
    <Row>
      {[...Array(reelsQuantity)].map((e, i) => {
        return (
          i < 7 && (
            <Col key={i} className="col-4 px-0 m-0 p-sm-1 p-lg-2 p-xl-3">
              <ContentCard
                src={"https://picsum.photos/1024/1024?random=" + (i + 8 * 2)}
                ratio={"1x1"}
                user={userInfo}
                avatar={props.avatar}
              />
            </Col>
          )
        );
      })}
    </Row>
  );
}

export default UserReels;
