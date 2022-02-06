import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserBar from "../components/UserBar";
import UserCard from "../components/UserCard";


function UserProfile(){
  let params = useParams();
  return (
    <Container className=" my-3 ">
      <UserCard id={params.user} />
      <UserBar id={params.user} />
    </Container>
  );
}
export default UserProfile;
