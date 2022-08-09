import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface props {
  message: string;
  cb: Function;
}

const popup = ({ message, cb }: props) => {
  return (
    <Popup
      trigger={<button onClick={() => cb()}> Okay</button>}
      position="top right"
    >
      <div>{message}</div>
    </Popup>
  );
};

export default popup;
