import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Api from "../api";
function UserCard(props) {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    username: "",
    email: "",
    website: "",
    avatar:"",
    address: {
      street: "",
      city: "",

    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });
  useEffect(() => {
    Api.GetUserById(props.id).then(({ data }) => {
      setUser(data);
      console.log(data);
    });
  }, [props.id]);
  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col className="d-flex align-items-center justify-content-center col-4 col-lg-4 mb-4">
          <img
            className="rounded-circle"
            width="75%"
            src={user.avatar}
            alt={user.id}
          />
        </Col>
        <Col className="col-8 col-lg-8">
          <Row className="align-items-center">
            <Col className="col-12 ">
              <span className="me-4 UserCardNickname">{user.username}</span>
            </Col>
            <Col className="col-12">
              <Button size="sm" className="rounded me-2 py-0 py-lg-2">
                Подписаться
              </Button>
              <Button
                variant="light"
                size="sm"
                className="rounded py-0 py-lg-3"
              >
                Отправить сообщение
              </Button>
            </Col>
            <Col className="col-12 col-lg-7 mb-2">
              <Row>
                <Col className="pe-2 col-4">
                  Публикаций <b>{user.email.length}</b>
                </Col>
                <Col className="pe-2 col-4">
                  Подписчиков <b>{user.address.city.length}</b>
                </Col>
                <Col className="pe-2 col-4">
                  Подписок <b>{user.username.length}</b>
                </Col>
              </Row>
            </Col>
            <Col className="col-10">
              <Row>
                <span>{user.name}</span>
                <h6 className="text-muted">{user.company.bs}</h6>
                <span>
                  Hi, I live in {user.address.city} and work on big projects at{" "}
                  {user.company.name}.
                </span>
                <a href={"https://" + user.website}>{user.website}</a>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default UserCard;
