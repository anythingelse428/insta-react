import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Api from "../api";
import MetaPost from "../models/MetaPost";
import MetaPostPlaceholder from "../models/MetaPostPlaceholder";
function MainPage() {
  const [arr] = useState([1, 2, 3])
  const [users, setUsers] = useState(null);
  useEffect(() => {
    Api.GetUser().then(({ data }) => {
      setTimeout(()=>{
        setUsers(data)
      },500
      )
    });
  }, []);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <>
          {!users && arr.map((i)=>(
            <MetaPostPlaceholder key={i} />
          )
          )}
        </>

        <>
          {users &&
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
      </Row>
    </Container>
  );
}
export default MainPage;
