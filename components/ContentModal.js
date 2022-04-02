import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function ContentModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState({ user: {}, src: "", avatar: "" });
  const pretieData = (ctx) => {
    setUser({
      id: ctx.user,
      src: ctx.src,
      avatar: `https://picsum.photos/1024/1024?random=${ctx.user}`,
      user: {
        id: ctx.user.id,
        name: ctx.user.name,
        username: ctx.user.username,
        email: ctx.user.email,
        avatar: ctx.user.avatar,
        address: {
          street: ctx.user.address.street,
          city: ctx.user.address.city,
        },
        website: ctx.user.website,
        company: {
          name: ctx.user.company.name,
          catchPhrase: ctx.user.company.catchPhrase,
          bs: ctx.user.company.bs,
        },
      },
    });
    handleShow(true);
  };
  useEffect(() => {
    window.addEventListener("show-modal", ({ detail }) => pretieData(detail));
  }, []);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="w-100"
      dialogClassName="w-100"
      size="xxl"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="w-100">
        <div className="container container-lg">
          <div className="row">
            <div className="col col-6 col-md-12">
              <img src={user.src} width={"100%"} />
            </div>
            <div className="col col-6 col-md-12">
              <div className="row align-items-center">

                <div className="col col-10">
                  <span>{user.user.name}</span>
                </div>
                <hr></hr>
              </div>

              <div className="col col-6">
                <div className="card-title d-flex align-items-center">
                  <a className="userLink">
                    <b className="ms-1 fs-6 mb-0">{user.user.name}</b>
                  </a>
                  <span className="ms-3">
                    lorem
                  </span>
                </div>
              </div>
              {/* <input className="commentInput" /> */}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal >
  );
}
export default ContentModal;
