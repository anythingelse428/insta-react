import { useEffect, useState } from "react";
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
  return (
    <div className="row">
      {[...Array(reelsQuantity)].map((e, i) => {
        return (
          i < 7 && (
            <div key={i} className="col col-4 px-0 m-0 p-sm-1 p-lg-2 p-xl-3">
              <ContentCard
                src={"https://picsum.photos/1024/1024?random=" + (i + 8 * 2)}
                ratio={"1x1"}
                user={userInfo}
                avatar={props.avatar}
              />
            </div>
          )
        );
      })}
    </div>
  );
}

export default UserReels;
