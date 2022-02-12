import { useEffect, useState } from "react";
import Api from "../api";
import ContentCard from "./ContentCard";


function UserPublish(props) {
  const [arr] = useState([1, 2, 3, 5, 4, 6, 7])
  const [publishQuantity, setPublishQuantity] = useState(0);
  const [userInfo, setUserInfo] = useState({
    id: props.id,
    src: '',
    avatar: '',
    user: {
      id: props.id,
      name: '',
      username: '',
      email: '',
      avatar: '',
      address: {
        street: '',
        city: '',
      },
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    },
  })
  useEffect(() => {
    Api.GetUserById(props.id).then(({ data }) => {
      setUserInfo(data)
      setTimeout(() => setPublishQuantity(data.name.length), 5);
    });
  }, [props.id]);
  return (
    <>
      <div className="row">
        {[...Array(publishQuantity)].map((e, i) => {
          return (
            <div key={i} className="col col-4 px-0 m-0 p-sm-1 p-lg-2 p-xl-3">
              <ContentCard
                ratio={"1x1"}
                src={"https://picsum.photos/1024/1024?random=" + i}
                user={userInfo}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
export default UserPublish;
