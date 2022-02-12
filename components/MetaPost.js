import Link from "next/link";
import { useEffect, useState } from "react";
import Api from "../api";
import ContentCard from "../components/ContentCard";

function MetaPost(props) {
  const [isHeartFill, setIsHeartFill] = useState(null);
  const [user, setUser] = useState({})
  useEffect(() => {
    Api.GetUserById(props.id).then(({ data }) => {
      setUser(data)
    });
  }, [props.id]);
  return (

    <div className="col col-7 p-7 my-3">
      <div
        className="card mainMetaPost"
        style={{
          width: "100%",
        }}
      >
        <div className="card-title d-flex align-items-center">
          <img
            src={props.avatar}
            width={"10%"}
            className="rounded-circle"
            alt={props.userName}
          />
          <Link href={`/user/${props.id}`} className="userLink">
            <a className="userLink">
              <span className="ms-3 fs-6 mb-0">{props.userName}</span>
            </a>
          </Link>
        </div>
          <ContentCard ratio={"4x3"} src={props.Img} user={user} className="metaPostBg" />
        <div className="row align-items-center">
          <div className="col col-11 px-4">
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
            <p className="card-text mb-3">
              {props.Text}
            </p>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
export default MetaPost;
