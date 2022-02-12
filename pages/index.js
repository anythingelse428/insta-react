import { useState } from "react";
import Api from "../api";
import MetaPost from "../components/MetaPost";

function Index({ users }) {
  const [arr] = useState([1, 2, 3])
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <>
          {
            users.map((user) => (
              <MetaPost
                key={user.id}
                avatar={user.avatar}
                userName={user.name}
                id={user.id}
                Img={`https://picsum.photos/1024/1024?random=${user.id + user.id * 4
                  }`}
                Text="asdasd"
              />
            ))}
        </>
      </div>
    </div>
  );
}
export default Index
export async function getStaticProps(ctx) {
  console.log(1);
  const { data } = await Api.GetUser()
  const users = data
  return {
    props: { users }
  }
}
