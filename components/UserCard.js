import { useEffect, useState } from "react";
import { Figure, Placeholder, Ratio } from "react-bootstrap";
import useInView from "react-cool-inview";

import Api from "../api";
const UserCard = (props, { width, height, ...rest }) => {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    username: "",
    email: "",
    website: "",
    avatar: "",
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
      setTimeout(() => setUser(data), 5)
    });
  }, [props.id]);

  const { observe, inView } = useInView({
    // threshold: .1,
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
  });
  return (

    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col d-flex align-items-center justify-content-center col-4 col-lg-4 mb-4" style={{ width, height }} ref={observe}>
          <Placeholder as={Figure.circle} animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          {inView &&
            <img
              className="rounded-circle "
              width="75%"
              src={user.avatar}
              alt={user.id}
              {...rest}
            />
          }
        </div>
        <div className="col col-8 col-lg-8">
          <div className="row align-items-center">
            <div className="col col-12">
              <span className="me-4 UserCardNickname">{user.username}</span>
            </div>
            <div className="col col-12">
              <button className="btn btn-sm btn-primary rounded me-2 py-0 py-lg-2">
                Подписаться
              </button>
              <button
                className="btn btn-sm btn-light rounded py-0 py-lg-3"
              >
                Отправить сообщение
              </button>
            </div>
            <div className="col col-12 col-lg-7 mb-2">
              <div className="row">
                <div className="col pe-2 col-4">
                  Публикаций <b>{user.email.length}</b>
                </div>
                <div className="col pe-2 col-4">
                  Подписчиков <b>{user.address.city.length}</b>
                </div>
                <div className="col pe-2 col-4">
                  Подписок <b>{user.username.length}</b>
                </div>
              </div>
            </div>
            <div className="col col-10">
              <div className="row">
                <span>{user.name}</span>
                <h6 className="text-muted">{user.company.bs}</h6>
                <span>
                  Hi, I live in {user.address.city} and work on big projects at{" "}
                  {user.company.name}.
                </span>
                <a href={"https://" + user.website}>{user.website}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default UserCard;
