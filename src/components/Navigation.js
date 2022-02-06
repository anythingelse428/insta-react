import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function navigation() {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Meta<i style={{ color: "skyblue" }}>!</i>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
export default navigation;
