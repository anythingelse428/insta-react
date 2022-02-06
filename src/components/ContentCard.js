import { Ratio } from "react-bootstrap";

function ContentCard(props) {
  const showModal = () => {
    const evt = new CustomEvent("show-modal", {
      detail: {
        user: props.user,
        src: props.src,
      },
    });
    console.log(evt);
    window.dispatchEvent(evt);
  };
  return (

    <Ratio aspectRatio={props.ratio} onClick={showModal}>
      <img src={props.src} alt="" />
    </Ratio>

  );
}
export default ContentCard;
