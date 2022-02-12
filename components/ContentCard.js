import { Placeholder, Ratio } from "react-bootstrap";
import useInView from "react-cool-inview";

const ContentCard = (props, { width, height, ...rest }) => {

  const showModal = () => {
    const evt = new CustomEvent("show-modal", {
      detail: {
        user: props.user,
        src: props.src,
      },
    });
    window.dispatchEvent(evt);
  };

  const { observe, inView } = useInView({
    // threshold: .1,
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
  });

  return (
    <div className={"ratio ratio-" + props.ratio} onClick={showModal} style={{ width, height }} ref={observe}>
      <Placeholder as={Ratio} animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      {inView &&
        <>
          <img src={props.src} alt=""  {...rest} />
        </>
      }
    </div>
  );
}
export default ContentCard;
